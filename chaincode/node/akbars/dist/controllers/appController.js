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
    //"{\"id\":\"123\",\"collateral\":{\"discount\":91,\"price_types_priority\":\"124325\",\"quantity\":100,\"security_code\":\"code123\",\"security_isin\":\"isin123\",\"security_name\":\"name123\"},\"collateral_Buyer\":{\"code\":\"11\",\"short_name\":\"name11\"},\"collateral_Seller\":{\"code\":\"11\",\"short_name\":\"name11\"},\"commitmentID1\":\"com1v7\",\"commitmentID2\":\"com2v7\",\"master_agreement\":{\"code\":\"code123\",\"date\":1560000190},\"suo\":{\"auto_margin\":\"Y\",\"return_var\":\"return_var\",\"reuse\":\"Y\",\"shift_term_date\":\"shift_term_date\"},\"whoMadeChanges\":\"admin123\", \"deal_num\":\"num1241\", \"deal_date\":1560000190, \"leg1_date\":1560000190, \"leg2_date\":1560000190, \"amount\":100000, \"currency\":\"BTC\", \"leg1_deal_type\":\"DVP1\", \"threshold1\":2.0, \"threshold2\":999.0, \"repo_rate\":10, \"int_meth\":\"365/366\"}"
    async addContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addTrade(ctx, param);
        return result;
    }
    async viewContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.viewTrade(ctx, param);
        return result;
    }
    async viewListContract(ctx) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.viewListTrade(ctx);
        return result;
    }
    //"{ \"tradeId\":\"123\", \"date\":12421412412, \"whoMadeChanges\":\"admin\", \"security_isin\":\"352532rf32\", \"security_name\":\"352532rf32\", \"market_price\":\"352532rf32\", \"market_price_type\":\"352532rf32\", \"market_price_cur\":\"352532rf32\", \"price_date\":\"352532rf32\", \"coupon_income\":\"352532rf32\", \"income_cur\":\"352532rf32\", \"price\":\"352532rf32\", \"price_cur\":\"352532rf32\", \"oblID\":\"352532rf32\" }"
    async addPriceToContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addPriceToTrade(ctx, param);
        return result;
    }
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"typeOrg\":\"buyer\", \"whoMadeChanges\":\"admin123\" }"
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"typeOrg\":\"seller\", \"whoMadeChanges\":\"admin123\" }"
    async acceptContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.acceptTrade(ctx, param);
        return result;
    }
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"buyer\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"seller\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    async addSignToContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.addSignToTrade(ctx, param);
        return result;
    }
    // "{\"tradeId\":\"116\", \"amount\": 10, \"quantitySecurities\": 20, \"dateTimeChange\":12435111, \"whoMadeChanges\":\"admin123\"}"
    // @Transaction()
    // @Returns('any')
    // public async updTrade(ctx: Context, param: string): Promise<any> {
    //     var tadeContr= new TradeContract();
    //     var result =await tadeContr.updTrade(ctx,param);
    //     return result;
    // }
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"commitmentID1\":\"com1vv7\", \"commitmentID2\":\"com2vv7\", \"whoMadeChanges\":\"admin123\" }"
    async closeContract(ctx, param) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.closeTrade(ctx, param);
        return result;
    }
    async setContractIsEarly(ctx, idTrade, isEarly, whoMadeChanges) {
        var tadeContr = new tradeController_1.TradeContract();
        var result = await tadeContr.setTradeIsEarly(ctx, idTrade, isEarly, whoMadeChanges);
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
], AppContract.prototype, "addContract", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "viewContract", null);
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
], AppContract.prototype, "acceptContract", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('any'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AppContract.prototype, "addSignToContract", null);
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