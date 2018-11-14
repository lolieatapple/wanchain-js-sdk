'use strict'

let     TxDataCreator = require('../common/TxDataCreator');
let     ccUtil        = require('../../../api/ccUtil');

/**
 * @class
 * @augments  TxDataCreator
 */
class RedeemTxE20DataCreator extends TxDataCreator{
  /**
   * @constructor
   * @param {Object} input  - {@link CrossChain#input input} of final users.(gas, gasPrice, value and so on)
   * @param {Object} config - {@link CrossChain#config config} of cross chain used.
   */
  constructor(input,config) {
    super(input,config);
  }

  /**
   * @override
   * @returns {Promise<{code: boolean, result: null}>}
   */
  async createCommonData(){
    global.logger.debug("Entering RedeemTxE20DataCreator::createCommonData");

    let record          = global.wanDb.getItem(this.config.crossCollection,{hashX:this.input.hashX});
    this.input.x        = record.x;
    this.retResult.code      = true;

    let  commonData     = {};
    commonData.from     = record.to;
    commonData.to       = this.config.dstSCAddr;
    commonData.value    = 0;
    commonData.gasPrice = ccUtil.getGWeiToWei(this.input.gasPrice);
    commonData.gasLimit = Number(this.input.gasLimit);
    commonData.gas      = Number(this.input.gasLimit);
    commonData.nonce    = null;

    try{
      if(this.input.hasOwnProperty('testOrNot')){
        commonData.nonce  = ccUtil.getNonceTest();
      }else{
        commonData.nonce  = await ccUtil.getNonce(commonData.from,this.input.chainType);
      }
      //commonData.nonce  = await ccUtil.getNonce(commonData.from,this.input.chainType);
      global.logger.debug("nonce:is ",commonData.nonce);
    }catch(error){
      global.logger.error("error:",error);
      this.retResult.code      = false;
      this.retResult.result    = error;
    }
    if(this.input.chainType === 'WAN'){
      commonData.Txtype = '0x01';
    }
    this.retResult.result  = commonData;

    return Promise.resolve(this.retResult);
  }

  /**
   * @override
   * @returns {{code: boolean, result: null}|transUtil.this.retResult|{code, result}}
   */
  createContractData(){
    global.logger.debug("Entering LockTxE20DataCreator::createContractData");
    try{
      let data = ccUtil.getDataByFuncInterface(this.config.midSCAbi,
        this.config.midSCAddr,
        this.config.redeemScFunc,
        this.config.srcSCAddr,              // parameter
        this.input.x                        // parameter
      );
      this.retResult.result    = data;
      this.retResult.code      = true;
    }catch(error){
      global.logger.error("createContractData: error: ",error);
      this.retResult.result      = error;
      this.retResult.code        = false;
    }
    return this.retResult;
  }

}

module.exports = RedeemTxE20DataCreator;