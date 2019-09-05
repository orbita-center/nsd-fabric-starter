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
const historyModel_1 = require("../models/historyModel");
const tradeModel_1 = require("../models/tradeModel");
const dataResult_1 = require("../models/dataResult");
//import { StateQueryResponse, Iterators } from 'fabric-shim';
let HistoryContract = class HistoryContract extends fabric_contract_api_1.Contract {
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
    async isExists(ctx, objId) {
        const buffer = await ctx.stub.getState(objId);
        return (!!buffer && buffer.length > 0);
    }
    async addHistoryToTrade(ctx, _historyStr, isFirstCreate = "false") {
        var result = new dataResult_1.DataResult();
        try {
            var _history = new historyModel_1.History();
            try {
                _history = JSON.parse(_historyStr);
            }
            catch (e) {
                throw new Error("Error parse json to History");
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _history.idTrade);
            if (!isExistTrade && isFirstCreate != "true") {
                throw new Error(`The trade ${_history.idTrade} doesn't exists`);
            }
            const collection = (new historyModel_1.History).constructor.name;
            const exists = await this.isExists(ctx, collection + _history.id);
            if (exists) {
                throw new Error(`The history ${_history.id} already exists`);
            }
            _history.typeObject = collection;
            var timestamp = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _history.date = timestamp;
            const buffer = Buffer.from(JSON.stringify(_history));
            await ctx.stub.putState(collection + _history.id, buffer);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async viewHistory(ctx, historyId) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new historyModel_1.History).constructor.name;
            const exists = await this.isExists(ctx, collection + historyId);
            if (!exists) {
                throw new Error(`The history ${historyId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection + historyId);
            const history = JSON.parse(buffer.toString());
            result.withData(history);
            return result;
        }
        catch (e) {
            result.withError(e);
            return result;
        }
    }
    async getHistoryFromTrade(ctx, tradeId) {
        var result = new dataResult_1.DataResult();
        try {
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${tradeId} doesn't exists`);
            }
            const collection = (new historyModel_1.History).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${tradeId}","typeObject":"${collection}"}}`);
            const history = await this.parseStateQueryIterator(buffer);
            result.withData(history);
            return result;
        }
        catch (e) {
            result.withError(e);
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
], HistoryContract.prototype, "isExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Object]),
    __metadata("design:returntype", Promise)
], HistoryContract.prototype, "addHistoryToTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<History>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], HistoryContract.prototype, "viewHistory", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<any[]>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], HistoryContract.prototype, "getHistoryFromTrade", null);
HistoryContract = __decorate([
    fabric_contract_api_1.Info({ title: 'HistoryContract', description: 'My Smart Contract' })
], HistoryContract);
exports.HistoryContract = HistoryContract;
//# sourceMappingURL=historyController.js.map