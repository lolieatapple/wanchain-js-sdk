"use strict";

const MessageTemplate = require('./MessageTemplate');

module.exports = {
    syncStoremanGroups(chainType,callback) {
        return new MessageTemplate('syncStoremanGroups',{crossChain:'ETH'},'storemanGroup',chainType,callback);
    },
    getBalance(address,chainType,callback){
        return new MessageTemplate('getBalance',{address:address},'balance',chainType,callback);
    },
    getMultiBalances(address,chainType,callback){
        return new MessageTemplate('getMultiBalances',{address:address},'balance',chainType,callback);
    },
    getMultiTokenBalance(address,chainType,callback){
        return new MessageTemplate('getMultiTokenBalance',{address:address, tokenType:"WETH"},'tokenBalance',chainType,callback);
    },
    getGasPrice(chainType, callback){
        return new MessageTemplate('getGasPrice',{}, "gasPrice", chainType, callback);
    },
    getBlockByNumber(blockNumber, chainType, callback){
        return new MessageTemplate('getBlockByNumber',{blockNumber:blockNumber}, "block", chainType, callback);
    },
    getTransactionReceipt(txHash,chainType,callback){
        return new MessageTemplate('getTransactionReceipt',{txHash:txHash},'receipt',chainType,callback);
    },
    getTxInfo(txHash,chainType,callback){
        return new MessageTemplate('getTxInfo',{txHash:txHash},'txInfo',chainType,callback);
    },
    getNonce(address,chainType,callback){
        return new MessageTemplate('getNonceIncludePending',{address:address},'nonce',chainType,callback);
    },
    getBlockNumber(chainType,callback){
        return new MessageTemplate('getBlockNumber',{},'blockNumber',chainType,callback);
    },
    getCrossEthScAddress(chainType,callback){
        return new MessageTemplate('getCrossEthScAddress',{},'groupAddr',chainType,callback);
    },
    sendRawTransaction(signedTx,chainType,callback){
        return new MessageTemplate('sendRawTransaction',{signedTx:signedTx},'txHash',chainType,callback);
    },
    getScEvent(address,topics,chainType,callback){
        return new MessageTemplate('getScEvent',{address:address,topics:topics},'logs',chainType,callback);
    },
    callScFunc(scAddr, name,args,abi,chainType,callback){
        return new MessageTemplate('callScFunc',{scAddr:scAddr,name:name,args:args,abi:abi},'value',chainType,callback);
    },
    getScVar( scAddr, name,abi,chainType,callback){
        return new MessageTemplate('getScVar',{scAddr:scAddr, name:name,abi:abi},'value',chainType,callback);
    },
    getCoin2WanRatio(crossChain, chainType, callback){
        return new MessageTemplate('getCoin2WanRatio',{crossChain:crossChain},'c2wRatio',chainType,callback);
    },
    monitorLog(address,topics,chainType,callback){
        return new MessageTemplate('monitorLog',{address:address,topics:topics},'logs',chainType,callback);
    },
    getTransactionConfirm(txHash,waitBlocks, chainType,callback){
        return new MessageTemplate('getTransactionConfirm',{txHash:txHash, waitBlocks:waitBlocks},'receipt',chainType,callback);
    },
}