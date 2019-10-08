"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
///модели
const tradeModel_1 = require("../models/tradeModel");
const historyModel_1 = require("../models/historyModel");
const obligationModel_1 = require("../models/obligationModel");
const dataResult_1 = require("../models/dataResult");
///модели
///enum
const tradeState_1 = require("../enums/tradeState");
const performanceStatus_1 = require("../enums/performanceStatus");
const tradeLifeStage_1 = require("../enums/tradeLifeStage");
const descriptionForHistory_1 = require("../enums/descriptionForHistory");
const obligationPartRepo_1 = require("../enums/obligationPartRepo");
///enum
///Requests
const closeTradeRequest_1 = require("../requests/tradeRequests/closeTradeRequest");
const acceptTradeRequest_1 = require("../requests/tradeRequests/acceptTradeRequest");
const addTradeRequest_1 = require("../requests/tradeRequests/addTradeRequest");
const addSignToTradeRequest_1 = require("../requests/tradeRequests/addSignToTradeRequest");
const updTradeRequest_1 = require("../requests/tradeRequests/updTradeRequest");
const addPriceToTradeRequest_1 = require("../requests/tradeRequests/addPriceToTradeRequest");
///Requests
///logs
const acceptTradeLog_1 = require("../log_history/acceptTradeLog");
const addTradeLog_1 = require("../log_history/addTradeLog");
const closeTradeLog_1 = require("../log_history/closeTradeLog");
const updTradeLog_1 = require("../log_history/updTradeLog");
const addSignToTradeLog_1 = require("../log_history/addSignToTradeLog");
///logs
///validation
const validationTrade_1 = require("../validation/validationTrade");
///validation
///Responses
const addPriceToTradeResponse_1 = require("../responses/addPriceToTradeResponse");
///Responses
const historyController_1 = require("./historyController");
const obligationController_1 = require("./obligationController");
let TradeContract = class TradeContract extends fabric_contract_api_1.Contract {
    async parseStateQueryIterator(stateQueryIterator) {
        const keys = [];
        const allResults = [];
        let res;
        while (res == null || !res.done) {
            res = await stateQueryIterator.next();
            if (res.value && res.value.value.toString()) {
                let parsedItem;
                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                }
                catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }
        await stateQueryIterator.close();
        return allResults;
    }
    async isExists(ctx, dealNum) {
        const buffer = await ctx.stub.getState(dealNum);
        return (!!buffer && buffer.length > 0);
    }
    //"{\"id\":\"116\",\"deal_collateral\":{\"Sec_discount\":91,\"Sec_price_types_priority\":\"124325\",\"Sec_quantity\":999,\"sec_code\":\"code123\",\"sec_isin\":\"isin123\",\"sec_name\":\"name123\"},\"creditor\":{\"depcode\":\"11\",\"short_name\":\"name11\"},\"debitor\":{\"depcode\":\"11\",\"short_name\":\"name11\"},\"ObligNum1\":\"com1v3\",\"ObligNum2\":\"com2v3\",\"master_agreement\":{\"repcode\":\"code123\",\"date\":1560000190},\"suo_params\":{\"Deal_auto_margin\":\"Y\",\"Deal_return_var\":\"Deal_return_var\",\"Deal_reuse\":\"Y\",\"Deal_shift_term_date\":\"Deal_shift_term_date\"},\"User\":\"admin123\", \"dealNum\":\"num1241\", \"trade_date\":1560000190, \"first_part_date\":1560000190, \"second_part_date\":1560000190, \"deal_amount\":2142, \"deal_cur\":\"BTC\", \"first_part_type\":\"DVP1\", \"Threshold_low\":2.0, \"Threshold_high\":999.0, \"rate\":3252, \"int_meth_type\":\"365/366\"}"
    async addTrade(ctx, addTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addTradeRequest = new addTradeRequest_1.AddTradeRequest();
            try {
                _addTradeRequest = JSON.parse(addTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.addTradeObjectIsValid(_addTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addTradeRequest.number);
            if (exists) {
                throw new Error(`The deal ${_addTradeRequest.number} already exists`);
            }
            //////проверяем есть ли такие айди обязательств
            const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
            const existscommitmentID1 = await this.isExists(ctx, collectionObligation + _addTradeRequest.ObligNum1);
            if (existscommitmentID1) {
                throw new Error(`The obligation ${_addTradeRequest.ObligNum1} already exists`);
            }
            const existscommitmentID2 = await this.isExists(ctx, collectionObligation + _addTradeRequest.ObligNum2);
            if (existscommitmentID2) {
                throw new Error(`The obligation ${_addTradeRequest.ObligNum2} already exists`);
            }
            //////
            var _newtrade = new tradeModel_1.Trade();
            _newtrade.typeObject = collection;
            _newtrade.dealNum = _addTradeRequest.number;
            _newtrade.number = _addTradeRequest.number;
            _newtrade.trade_date = _addTradeRequest.trade_date;
            _newtrade.first_part_date = _addTradeRequest.first_part_date;
            _newtrade.second_part_date = _addTradeRequest.second_part_date;
            _newtrade.deal_amount = _addTradeRequest.deal_amount;
            _newtrade.deal_cur = _addTradeRequest.deal_cur;
            _newtrade.first_part_type = _addTradeRequest.first_part_type;
            _newtrade.Threshold_low = _addTradeRequest.Threshold_low;
            _newtrade.Threshold_high = _addTradeRequest.Threshold_high;
            _newtrade.rate = _addTradeRequest.rate;
            _newtrade.int_meth_type = _addTradeRequest.int_meth_type;
            _newtrade.creditor = _addTradeRequest.creditor;
            _newtrade.debitor = _addTradeRequest.debitor;
            _newtrade.master_agreement = _addTradeRequest.master_agreement;
            _newtrade.deal_collateral = _addTradeRequest.deal_collateral;
            var _newsuo = new tradeModel_1.SUO();
            _newsuo.Deal_auto_margin = _addTradeRequest.suo_params.Deal_auto_margin;
            _newsuo.Deal_return_var = _addTradeRequest.suo_params.Deal_return_var;
            _newsuo.Deal_reuse = _addTradeRequest.suo_params.Deal_reuse;
            _newsuo.Deal_shift_term_date = _addTradeRequest.suo_params.Deal_shift_term_date;
            _newtrade.suo_params = _newsuo;
            _newtrade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_CONTRACT;
            const buffer = Buffer.from(JSON.stringify(_newtrade));
            await ctx.stub.putState(collection + _newtrade.number, buffer);
            const historyContract = new historyController_1.HistoryContract();
            const obligationContract = new obligationController_1.ObligationContract();
            //кредитор
            var _creditorObligation = new obligationModel_1.Obligation();
            _creditorObligation.id = _addTradeRequest.ObligNum1;
            _creditorObligation.idTrade = _addTradeRequest.number;
            _creditorObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _creditorObligation.initiator = _addTradeRequest.user;
            _creditorObligation.deal_amount = _addTradeRequest.deal_amount;
            _creditorObligation.quantitySecurities = 0;
            _creditorObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _creditorObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.FIRST;
            _creditorObligation.is_revaluation = false;
            const _descriptioncreditorObligation = JSON.stringify(_creditorObligation);
            var createCreditorObligResponse = await obligationContract.createObligation(ctx, _descriptioncreditorObligation, "creditor");
            if (!createCreditorObligResponse.isSuccess && createCreditorObligResponse.data !== "SUCCESS") {
                throw new Error("Create Creditor Obligation: " + createCreditorObligResponse);
            }
            //заемщик
            var _debitorObligation = new obligationModel_1.Obligation();
            _debitorObligation.id = _addTradeRequest.ObligNum2;
            _debitorObligation.idTrade = _addTradeRequest.number;
            _debitorObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _debitorObligation.initiator = _addTradeRequest.user;
            _debitorObligation.deal_amount = 0;
            _debitorObligation.quantitySecurities = -_addTradeRequest.deal_collateral.Sec_quantity;
            _debitorObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _debitorObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.FIRST;
            _debitorObligation.is_revaluation = false;
            const _descriptiondebitorObligation = JSON.stringify(_debitorObligation);
            var createDebitorObligResponse = await obligationContract.createObligation(ctx, _descriptiondebitorObligation, "debitor");
            if (!createDebitorObligResponse.isSuccess || createDebitorObligResponse.data !== "SUCCESS") {
                throw new Error("Create Debitor Obligation: " + createDebitorObligResponse);
            }
            var _addTradeLog = new addTradeLog_1.AddTradeLog();
            _addTradeLog.nameMethos = "addTrade";
            _addTradeLog.ObligNum1 = _addTradeRequest.ObligNum1;
            _addTradeLog.ObligNum2 = _addTradeRequest.ObligNum2;
            _addTradeLog.newTrade = _newtrade;
            const _descriptionInfo = JSON.stringify(_addTradeLog);
            var _history = new historyModel_1.History();
            _history.WhatHasChanged = _descriptionInfo;
            _history.WhoMadeChanges = _addTradeRequest.user;
            _history.Detailing = descriptionForHistory_1.DescriptionForHistory.ADD_TRADE;
            _history.contrID = _addTradeRequest.number;
            const collectionHistory = (new historyModel_1.History).constructor.name;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo, "true");
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async viewTrade(ctx, dealNum) {
        var result = new dataResult_1.DataResult();
        try {
            // var _getDealRequest = new GetDealRequest();
            // try {
            //     _getDealRequest = JSON.parse(getDealRequestStr) as AddTradeRequest;
            // }
            // catch (e) {
            //     throw new Error("Error parse json from request");
            // }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + dealNum);
            if (!exists) {
                throw new Error(`The deal ${dealNum} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection + dealNum);
            const trade = JSON.parse(buffer.toString());
            result.withData(trade);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async viewListTrade(ctx) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new tradeModel_1.Trade).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${collection}"}}`);
            const trade = (await this.parseStateQueryIterator(buffer));
            result.withData(trade);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async addPriceToTrade(ctx, addPriceToTradeRequestStr, isCloseTrade = "false") {
        var result = new dataResult_1.DataResult();
        try {
            var _addPriceToTradeResponse = new addPriceToTradeResponse_1.AddPriceToTradeResponse();
            var _addPriceToTradeRequest = new addPriceToTradeRequest_1.AddPriceToTradeRequest();
            try {
                _addPriceToTradeRequest = JSON.parse(addPriceToTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.AddPriceToTradeRequestIsValid(_addPriceToTradeRequest);
            if (!validResult.isSuccess && isCloseTrade == "false") {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addPriceToTradeRequest.contrID);
            if (!exists) {
                throw new Error(`The deal ${_addPriceToTradeRequest.contrID} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _addPriceToTradeRequest.contrID);
            const trade = JSON.parse(bufferRead.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT;
                const buffer = Buffer.from(JSON.stringify(trade));
                await ctx.stub.putState(collection + _addPriceToTradeRequest.contrID, buffer);
            }
            //проценты
            var nowInTimeSt = new Date();
            var nowDate = new Date(nowInTimeSt.getFullYear(), nowInTimeSt.getMonth(), nowInTimeSt.getDate());
            var nowInTimestamp = Math.round((+nowDate) / 1000);
            var countday = Math.ceil((nowInTimestamp - trade.dateAcceptInProcessing) / 86400);
            var move_quantity = 0;
            var move_amount = 0;
            if (isCloseTrade == "false") {
                ///переоценка 
                //текущая стоимость бумаг
                const now_deal_amount = trade.deal_collateral.Sec_quantity * _addPriceToTradeRequest.price;
                //дисконт по текущей стоимости бумаг
                const now_deal_amount_with_discont = now_deal_amount * (100 - trade.deal_collateral.Sec_discount) / 100;
                //пороги от первоначальной сумме сделки
                const threshold_low = trade.deal_amount * (100 - trade.Threshold_low) / 100;
                const threshold_high = trade.deal_amount * (100 - trade.Threshold_high) / 100;
                //если вышли за верзний или нижний порог
                if (now_deal_amount_with_discont < threshold_low || now_deal_amount_with_discont > threshold_high) {
                    move_amount = trade.deal_amount - now_deal_amount_with_discont;
                    move_quantity = Math.ceil(move_amount / _addPriceToTradeRequest.price);
                    const obligationContract = new obligationController_1.ObligationContract();
                    var _newObligation = new obligationModel_1.Obligation();
                    _newObligation.id = _addPriceToTradeRequest.oblID;
                    _newObligation.idTrade = _addPriceToTradeRequest.contrID;
                    _newObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
                    _newObligation.initiator = _addPriceToTradeRequest.WhoMadeChanges;
                    _newObligation.deal_amount = 0;
                    _newObligation.quantitySecurities = move_quantity;
                    _newObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
                    _newObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.SECOND;
                    _newObligation.is_revaluation = true;
                    const _descriptioncreditorObligation = JSON.stringify(_newObligation);
                    var name = "";
                    if (move_quantity > 0) {
                        name = "creditor";
                    }
                    else {
                        name = "debitor";
                    }
                    //////проверяем есть ли такие айди обязательств
                    const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
                    const existscommitmentID1 = await this.isExists(ctx, collectionObligation + _addPriceToTradeRequest.oblID);
                    if (existscommitmentID1) {
                        throw new Error(`The obligation ${_addPriceToTradeRequest.oblID} already exists`);
                    }
                    var createCreditorObligResponse = await obligationContract.createObligation(ctx, _descriptioncreditorObligation, name);
                    if (!createCreditorObligResponse.isSuccess || createCreditorObligResponse.data !== "SUCCESS") {
                        throw new Error(`Create ${name} Obligation: ` + createCreditorObligResponse);
                    }
                }
                ///
            }
            _addPriceToTradeResponse.necesSUM = move_quantity;
            _addPriceToTradeResponse.rePurchasePriceCur = trade.deal_amount;
            _addPriceToTradeResponse.allSumCollateral = countday * trade.deal_amount * trade.rate / (365 * 100);
            result.withData(_addPriceToTradeResponse);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    //"{ \"dealNum\":\"117\", \"Date\":12435111, \"partyRole\":\"creditor\", \"User\":\"admin123\" }"
    //"{ \"dealNum\":\"117\", \"Date\":12435111, \"partyRole\":\"debitor\", \"User\":\"admin123\" }"
    async acceptTrade(ctx, acceptTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _acceptTradeRequest = new acceptTradeRequest_1.AcceptTradeRequest();
            try {
                _acceptTradeRequest = JSON.parse(acceptTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.acceptTradeObjectIsValid(_acceptTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _acceptTradeRequest.dealNum);
            if (!exists) {
                throw new Error(`The deal ${_acceptTradeRequest.dealNum} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _acceptTradeRequest.dealNum);
            const trade = JSON.parse(bufferRead.toString());
            if (trade.suo_params == null) {
                throw new Error(`The suo_params for deal ${_acceptTradeRequest.dealNum} does not exist`);
            }
            switch (_acceptTradeRequest.partyRole) {
                case "creditor": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_DEBITOR) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo_params.collateral_creditor_accept = 1;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_CREDITOR;
                    break;
                }
                case "debitor": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_DEBITOR) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo_params.collateral_debitor_accept = 1;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_DEBITOR;
                    break;
                }
                default: {
                    throw new Error(`The partyRole ${_acceptTradeRequest.partyRole} does not exist`);
                    break;
                }
            }
            if (trade.suo_params.collateral_creditor_accept && trade.suo_params.collateral_debitor_accept) {
                trade.status = tradeState_1.TradeState.ACCEPT_INPROCESSING;
                var nowInTimeSt = new Date();
                var nowDate = new Date(nowInTimeSt.getFullYear(), nowInTimeSt.getMonth(), nowInTimeSt.getDate());
                trade.dateAcceptInProcessing = Math.round((+nowDate) / 1000);
            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _acceptTradeRequest.dealNum, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _acceptTradeLog = new acceptTradeLog_1.AcceptTradeLog();
            _acceptTradeLog.nameMethos = "confirmDeal";
            _acceptTradeLog.partyRole = _acceptTradeRequest.partyRole;
            _acceptTradeLog.Date = _acceptTradeRequest.Date;
            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            var _history = new historyModel_1.History();
            _history.WhoMadeChanges = _acceptTradeRequest.User;
            if (trade.suo_params.collateral_creditor_accept && trade.suo_params.collateral_debitor_accept) {
                _history.Detailing = descriptionForHistory_1.DescriptionForHistory.ACCEPT_TRADE_AND_IS_ACTIVE.replace("contrName", _acceptTradeRequest.User);
            }
            else {
                _history.Detailing = descriptionForHistory_1.DescriptionForHistory.ACCEPT_TRADE.replace("contrName", _acceptTradeRequest.User);
            }
            _history.WhatHasChanged = _descriptionInfo;
            _history.contrID = _acceptTradeRequest.dealNum;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    //"{ \"dealNum\":\"117\", \"Date\":12435111, \"signer\":\"admin123\", \"partyRole\":\"creditor\", \"partyRole\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"dealNum\":\"117\", \"Date\":12435111, \"signer\":\"admin123\", \"partyRole\":\"debitor\", \"partyRole\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    async addSignToTrade(ctx, addSignToTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addSignToTradeRequest = new addSignToTradeRequest_1.AddSignToTradeRequest();
            try {
                _addSignToTradeRequest = JSON.parse(addSignToTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.addSingToTradeObjectIsValid(_addSignToTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addSignToTradeRequest.dealNum);
            if (!exists) {
                throw new Error(`The deal ${_addSignToTradeRequest.dealNum} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _addSignToTradeRequest.dealNum);
            const trade = JSON.parse(bufferRead.toString());
            var newDealSigned = new tradeModel_1.Sign();
            newDealSigned.deal_conf = 0;
            newDealSigned.Date = _addSignToTradeRequest.Date;
            newDealSigned.cryptoKey = _addSignToTradeRequest.cryptoKey;
            newDealSigned.cryptoType = _addSignToTradeRequest.cryptoType;
            newDealSigned.payload = _addSignToTradeRequest.payload;
            newDealSigned.signPayload = _addSignToTradeRequest.signPayload;
            newDealSigned.signer = _addSignToTradeRequest.signer;
            switch (_addSignToTradeRequest.partyRole) {
                case "debitor": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_CREDITOR) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.DealSigned.debitorSign = newDealSigned;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_DEBITOR;
                    break;
                }
                case "creditor": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_CONTRACT) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.DealSigned = new tradeModel_1.DealSigned();
                    trade.DealSigned.creditorSign = newDealSigned;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_CREDITOR;
                    break;
                }
                default: {
                    throw new Error(`The partyRole ${_addSignToTradeRequest.partyRole} does not exist`);
                    break;
                }
            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _addSignToTradeRequest.dealNum, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            var historyContract = new historyController_1.HistoryContract();
            const _acceptTradeLog = new addSignToTradeLog_1.AddSignToTradeLog();
            _acceptTradeLog.nameMethos = "addSignToTrade";
            _acceptTradeLog.partyRole = _addSignToTradeRequest.partyRole;
            _acceptTradeLog.Date = _addSignToTradeRequest.Date;
            _acceptTradeLog.cryptoKey = _addSignToTradeRequest.cryptoKey;
            _acceptTradeLog.payload = _addSignToTradeRequest.payload;
            _acceptTradeLog.signPayload = _addSignToTradeRequest.signPayload;
            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            const _history = new historyModel_1.History();
            _history.WhoMadeChanges = _addSignToTradeRequest.signer;
            _history.WhatHasChanged = _descriptionInfo;
            _history.Detailing = descriptionForHistory_1.DescriptionForHistory.ADD_SIGN_TO_CONTRACT.replace("contrName", _addSignToTradeRequest.signer);
            _history.contrID = _addSignToTradeRequest.dealNum;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    // "{\"dealNum\":\"116\", \"deal_amount\": 10, \"quantitySecurities\": 20, \"DateChange\":12435111, \"User\":\"admin123\"}"
    async updTrade(ctx, _updTradeRequestStr) {
        var _updTradeRequest = new updTradeRequest_1.UpdTradeRequest();
        var result = new dataResult_1.DataResult();
        try {
            try {
                var _updTradeRequest = JSON.parse(_updTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.updTradeObjectIsValid(_updTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _updTradeRequest.contrID);
            if (!isExistTrade) {
                throw new Error(`The deal ${_updTradeRequest.contrID} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + _updTradeRequest.contrID);
            var trade = JSON.parse(bufferRead.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            trade.deal_amount += _updTradeRequest.Amount;
            trade.deal_collateral.Sec_quantity += _updTradeRequest.QuantitySecurities;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _updTradeRequest.contrID, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _updTradeLog = new updTradeLog_1.UpdTradeLog();
            _updTradeLog.nameMethos = "updTrade";
            _updTradeLog.DateChange = _updTradeRequest.DateTimeChange;
            _updTradeLog.deal_amount = _updTradeRequest.Amount;
            _updTradeLog.quantitySecurities = _updTradeRequest.QuantitySecurities;
            const _descriptionInfo = JSON.stringify(_updTradeLog);
            var _history = new historyModel_1.History();
            _history.WhatHasChanged = _descriptionInfo;
            _history.WhoMadeChanges = _updTradeRequest.WhoMadeChanges;
            _history.Detailing = descriptionForHistory_1.DescriptionForHistory.UPD_TRADE;
            _history.contrID = _updTradeRequest.contrID;
            _history.DateTimeChange = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    //"{ \"dealNum\":\"116\", \"Date\":12435111, \"ObligNum1\":\"com1v2\", \"ObligNum2\":\"com2v2\", \"User\":\"admin123\" }"
    async closeTrade(ctx, closeTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _closeInfo = new closeTradeRequest_1.CloseTradeRequest();
            try {
                var _closeInfo = JSON.parse(closeTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.closeTradeObjectIsValid(_closeInfo);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _closeInfo.contrID);
            if (!isExistTrade) {
                throw new Error(`The deal ${_closeInfo.contrID} doesn't exists`);
            }
            //////проверяем есть ли такие айди обязательств
            const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
            const existscommitmentID1 = await this.isExists(ctx, collectionObligation + _closeInfo.CommitmentID1);
            if (existscommitmentID1) {
                throw new Error(`The obligation ${_closeInfo.CommitmentID1} already exists`);
            }
            const existscommitmentID2 = await this.isExists(ctx, collectionObligation + _closeInfo.CommitmentID2);
            if (existscommitmentID2) {
                throw new Error(`The obligation ${_closeInfo.CommitmentID2} already exists`);
            }
            //////
            const bufferRead = await ctx.stub.getState(collectionTrade + _closeInfo.contrID);
            var trade = JSON.parse(bufferRead.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            trade.lifeStage = tradeLifeStage_1.TradeLifeStage.CLOSE_CONTRACT;
            trade.status = tradeState_1.TradeState.СOMPLETED_CLOSED; // 2 -закрыт
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _closeInfo.contrID, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _closeTradeLog = new closeTradeLog_1.CloseTradeLog();
            _closeTradeLog.nameMethos = "closeTrade";
            _closeTradeLog.ObligNum1 = _closeInfo.CommitmentID1;
            _closeTradeLog.ObligNum2 = _closeInfo.CommitmentID2;
            _closeTradeLog.Date = _closeInfo.date;
            const _descriptionInfo = JSON.stringify(_closeTradeLog);
            var _history = new historyModel_1.History();
            _history.WhoMadeChanges = _closeInfo.WhoMadeChanges;
            _history.WhatHasChanged = _descriptionInfo;
            _history.Detailing = descriptionForHistory_1.DescriptionForHistory.CLOSE_CONTRACT;
            _history.contrID = _closeInfo.contrID;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            let obligationContract = new obligationController_1.ObligationContract();
            var _addPriceToTradeRequest = new addPriceToTradeRequest_1.AddPriceToTradeRequest();
            _addPriceToTradeRequest.contrID = _closeInfo.contrID;
            //получить последнюю сумму для обязательств
            const _addPriceToTradeRequestStr = JSON.stringify(_addPriceToTradeRequest);
            var resultAmount = await this.addPriceToTrade(ctx, _addPriceToTradeRequestStr, "true");
            if (!resultAmount.isSuccess) {
                throw new Error(resultAmount.error);
            }
            //кредитор
            var _creditorObligation = new obligationModel_1.Obligation();
            _creditorObligation.id = _closeInfo.CommitmentID1;
            _creditorObligation.idTrade = _closeInfo.contrID;
            _creditorObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _creditorObligation.initiator = _closeInfo.WhoMadeChanges;
            _creditorObligation.deal_amount = 0;
            _creditorObligation.quantitySecurities = trade.deal_collateral.Sec_quantity;
            _creditorObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _creditorObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.SECOND;
            _creditorObligation.is_revaluation = false;
            const _descriptioncreditorObligation = JSON.stringify(_creditorObligation);
            var createCreditorObligResponse = await obligationContract.createObligation(ctx, _descriptioncreditorObligation, "creditor");
            if (!createCreditorObligResponse.isSuccess || createCreditorObligResponse.data !== "SUCCESS") {
                throw new Error("Create Creditor Obligation: " + createCreditorObligResponse);
            }
            //заемщик
            var _debitorObligation = new obligationModel_1.Obligation();
            _debitorObligation.id = _closeInfo.CommitmentID2;
            _debitorObligation.idTrade = _closeInfo.contrID;
            _debitorObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _debitorObligation.initiator = _closeInfo.WhoMadeChanges;
            _debitorObligation.deal_amount = -resultAmount.data;
            _debitorObligation.quantitySecurities = 0;
            _debitorObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _debitorObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.SECOND;
            _debitorObligation.is_revaluation = false;
            const _descriptiondebitorObligation = JSON.stringify(_debitorObligation);
            var createDebitorObligResponse = await obligationContract.createObligation(ctx, _descriptiondebitorObligation, "debitor");
            if (!createDebitorObligResponse.isSuccess || createDebitorObligResponse.data !== "SUCCESS") {
                throw new Error("Create Debitor Obligation: " + createDebitorObligResponse);
            }
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async setTradeIsEarly(ctx, idTrade, isEarly, User) {
        var result = new dataResult_1.DataResult();
        try {
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The deal ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);
            var trade = JSON.parse(bufferRead.toString());
            trade.isEarly = isEarly;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + idTrade, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _history = new historyModel_1.History();
            _history.WhoMadeChanges = User;
            _history.Detailing = `Change deal, early is ${isEarly.toString()}`;
            _history.contrID = idTrade;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async getTradeIsEarly(ctx, idTrade) {
        var result = new dataResult_1.DataResult();
        try {
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The deal ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);
            var trade = JSON.parse(bufferRead.toString());
            result.withData(`early is ${trade.isEarly}`);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "isExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Trade'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "viewTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<Trade[]>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "viewListTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<AddPriceToTradeResponse>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Object]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addPriceToTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "acceptTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addSignToTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "updTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "closeTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "setTradeIsEarly", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "getTradeIsEarly", null);
TradeContract = __decorate([
    fabric_contract_api_1.Info({ title: 'TradeContract', description: 'My Smart Contract' })
], TradeContract);
exports.TradeContract = TradeContract;
//# sourceMappingURL=tradeController.js.map