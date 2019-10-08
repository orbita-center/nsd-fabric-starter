"use strict";
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
const historyController_1 = require("./historyController");
const obligationController_1 = require("./obligationController");
const tradeController_1 = require("./tradeController");
const fabric_contract_api_1 = require("fabric-contract-api");
let AppContract = class AppContract extends fabric_contract_api_1.Contract {
    async isExists(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.isExists(ctx, param);
        return result;
    }
    //"{ \"deal_collateral\": { \"Sec_discount\": 10, \"Sec_price_types_priority\": \"124325\", \"Sec_quantity\": 100000, \"sec_code\": \"code123\", \"sec_isin\": \"isin123\", \"sec_name\": \"name123\" }, \"creditor\": { \"depcode\": \"11\", \"short_name\": \"name11\" }, \"debitor\": { \"depcode\": \"11\", \"short_name\": \"name11\" }, \"ObligNum1\": \"com1v10\", \"ObligNum2\": \"com2v10\", \"master_agreement\": { \"repcode\": \"code123\", \"date\": 1560000190 }, \"suo_params\": { \"Deal_auto_margin\": \"Y\", \"Deal_return_var\": \"Deal_return_var\", \"Deal_reuse\": \"Y\", \"Deal_shift_term_date\": \"Deal_shift_term_date\" }, \"user\": \"admin123\", \"number\": \"num1244\", \"dealNum\": \"num1244\", \"trade_date\": 1560000190, \"first_part_date\": 1560000190, \"second_part_date\": 1560000190, \"deal_amount\": 1000000, \"deal_cur\": \"BTC\", \"first_part_type\": \"DVP1\", \"Threshold_low\": 5, \"Threshold_high\": 5, \"rate\": 10, \"int_meth_type\": \"365/366\" }"
    async newDeal(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addTrade(ctx, param);
        return result;
    }
    async getDeal(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.viewTrade(ctx, param);
        return result;
    }
    async viewListContract(ctx) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.viewListTrade(ctx);
        return result;
    }
    //"{ \"User\": \"admin\", \"dealNum\": \"num1244\", \"date\": 12421412412, \"sec_isin\": \"352532rf32\", \"sec_name\": \"352532rf32\", \"market_price\": 0.9, \"market_price_type\": \"352532rf32\", \"market_price_cur\": \"352532rf32\", \"price_date\": 12421412412, \"coupon_income\": 0, \"income_cur\": \"352532rf32\", \"price\": 0.9, \"price_cur\": \"352532rf32\", \"oblID\": \"352532rf32\" }"
    async addPriceToContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addPriceToTrade(ctx, param);
        return result;
    }
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"partyRole\":\"creditor\", \"User\":\"admin123\" }"
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"partyRole\":\"debitor\", \"User\":\"admin123\" }"
    async confirmDeal(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.acceptTrade(ctx, param);
        return result;
    }
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"signer\":\"admin123\",\"partyRole\":\"creditor\", \"payload\":\"creditor\", \"payload\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"signer\":\"admin123\", \"partyRole\":\"debitor\", \"payload\":\"debitor\", \"payload\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    async signDeal(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addSignToTrade(ctx, param);
        return result;
    }
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"ObligNum1\":\"com1vv10\", \"ObligNum2\":\"com2vv10\", \"User\":\"admin123\" }"
    async closeContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.closeTrade(ctx, param);
        return result;
    }
    //"{ \"User\": \"admin123\", \"dealNum\": \"num1244\", \"DateChange\": 12435111, \"deal_amount\": 0, \"quantitySecurities\": 12 }"
    async updContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.updTrade(ctx, param);
        return result;
    }
    async setContractIsEarly(ctx, idTrade, isEarly, User) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.setTradeIsEarly(ctx, idTrade, isEarly, User);
        return result;
    }
    async getContractIsEarly(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.getTradeIsEarly(ctx, param);
        return result;
    }
    async addHistoryToContract(ctx, param) {
        var histContr = new historyController_1.HistoryContract();
        var result = await histContr.addHistoryToTrade(ctx, param);
        return result;
    }
    async viewHistory(ctx, param) {
        var histContr = new historyController_1.HistoryContract();
        var result = await histContr.viewHistory(ctx, param);
        return result;
    }
    async getHistoryFromContract(ctx, param) {
        var histContr = new historyController_1.HistoryContract();
        var result = await histContr.getHistoryFromTrade(ctx, param);
        return result;
    }
    async viewObligation(ctx, param) {
        var obligContr = new obligationController_1.ObligationContract();
        var result = await obligContr.viewObligation(ctx, param);
        return result;
    }
    async addObligationStatus(ctx, param) {
        var obligContr = new obligationController_1.ObligationContract();
        var result = await obligContr.addObligationStatus(ctx, param);
        return result;
    }
    async getObligationList(ctx, param) {
        var obligContr = new obligationController_1.ObligationContract();
        var result = await obligContr.getObligationList(ctx, param);
        return result;
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "isExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "newDeal", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "getDeal", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "viewListContract", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "addPriceToContract", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "confirmDeal", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "signDeal", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "closeContract", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "updContract", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "setContractIsEarly", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "getContractIsEarly", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "addHistoryToContract", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "viewHistory", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "getHistoryFromContract", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "viewObligation", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "addObligationStatus", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "getObligationList", null);
AppContract = __decorate([
    fabric_contract_api_1.Info({ title: 'AppContract', description: 'My Smart Contract' })
], AppContract);
exports.AppContract = AppContract;
//# sourceMappingURL=appController.js.map