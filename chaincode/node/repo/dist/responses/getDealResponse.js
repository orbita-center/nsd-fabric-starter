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
const tradeBaseBlocks_1 = require("../base_blocks/tradeBaseBlocks");
let Sign = class Sign extends tradeBaseBlocks_1.SignBase {
};
Sign = __decorate([
    fabric_contract_api_1.Object()
], Sign);
exports.Sign = Sign;
let DealSigned = class DealSigned {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Sign)
], DealSigned.prototype, "creditorSign", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Sign)
], DealSigned.prototype, "debitorSign", void 0);
DealSigned = __decorate([
    fabric_contract_api_1.Object()
], DealSigned);
exports.DealSigned = DealSigned;
let Master_Agreement = class Master_Agreement extends tradeBaseBlocks_1.Master_AgreementBase {
};
Master_Agreement = __decorate([
    fabric_contract_api_1.Object()
], Master_Agreement);
exports.Master_Agreement = Master_Agreement;
let Deal_collateral = class Deal_collateral extends tradeBaseBlocks_1.CollateralBase {
};
Deal_collateral = __decorate([
    fabric_contract_api_1.Object()
], Deal_collateral);
exports.Deal_collateral = Deal_collateral;
let Collateral_User = class Collateral_User extends tradeBaseBlocks_1.Collateral_UserBase {
};
Collateral_User = __decorate([
    fabric_contract_api_1.Object()
], Collateral_User);
exports.Collateral_User = Collateral_User;
let GetDealResponse = class GetDealResponse {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetDealResponse.prototype, "number", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "trade_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "first_part_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "second_part_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "deal_amount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetDealResponse.prototype, "deal_cur", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetDealResponse.prototype, "first_part_type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "Threshold_low", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "Threshold_high", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetDealResponse.prototype, "rate", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetDealResponse.prototype, "int_meth_type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Collateral_User)
], GetDealResponse.prototype, "creditor", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Collateral_User)
], GetDealResponse.prototype, "debitor", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Master_Agreement)
], GetDealResponse.prototype, "master_agreement", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Deal_collateral)
], GetDealResponse.prototype, "deal_collateral", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", tradeBaseBlocks_1.SUOBase)
], GetDealResponse.prototype, "suo_params", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", DealSigned)
], GetDealResponse.prototype, "DealSigned", void 0);
GetDealResponse = __decorate([
    fabric_contract_api_1.Object()
], GetDealResponse);
exports.GetDealResponse = GetDealResponse;
//# sourceMappingURL=getDealResponse.js.map