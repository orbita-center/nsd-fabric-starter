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
let AddPriceToTradeRequest = class AddPriceToTradeRequest {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "contrID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddPriceToTradeRequest.prototype, "date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "WhoMadeChanges", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "security_code", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "security_isin", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "security_name", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddPriceToTradeRequest.prototype, "market_price", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "market_price_type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "market_price_cur", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddPriceToTradeRequest.prototype, "price_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddPriceToTradeRequest.prototype, "coupon_income", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "income_cur", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddPriceToTradeRequest.prototype, "price", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "price_cur", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddPriceToTradeRequest.prototype, "oblID", void 0);
AddPriceToTradeRequest = __decorate([
    fabric_contract_api_1.Object()
], AddPriceToTradeRequest);
exports.AddPriceToTradeRequest = AddPriceToTradeRequest;
//# sourceMappingURL=addPriceToTradeRequest.js.map