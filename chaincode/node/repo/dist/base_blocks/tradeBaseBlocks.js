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
let TradeBase = class TradeBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "dealNum", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "number", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "trade_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "first_part_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "second_part_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "deal_amount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "deal_cur", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "first_part_type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "Threshold_low", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "Threshold_high", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "rate", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "int_meth_type", void 0);
TradeBase = __decorate([
    fabric_contract_api_1.Object()
], TradeBase);
exports.TradeBase = TradeBase;
let SUOBase = class SUOBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "Deal_reuse", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "Deal_return_var", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "Deal_shift_term_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "Deal_auto_margin", void 0);
SUOBase = __decorate([
    fabric_contract_api_1.Object()
], SUOBase);
exports.SUOBase = SUOBase;
let Master_AgreementBase = class Master_AgreementBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Master_AgreementBase.prototype, "repcode", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Master_AgreementBase.prototype, "date", void 0);
Master_AgreementBase = __decorate([
    fabric_contract_api_1.Object()
], Master_AgreementBase);
exports.Master_AgreementBase = Master_AgreementBase;
let CollateralBase = class CollateralBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "sec_code", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "sec_isin", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "sec_name", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], CollateralBase.prototype, "Sec_quantity", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], CollateralBase.prototype, "Sec_discount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "Sec_price_types_priority", void 0);
CollateralBase = __decorate([
    fabric_contract_api_1.Object()
], CollateralBase);
exports.CollateralBase = CollateralBase;
let Collateral_UserBase = class Collateral_UserBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Collateral_UserBase.prototype, "depcode", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Collateral_UserBase.prototype, "short_name", void 0);
Collateral_UserBase = __decorate([
    fabric_contract_api_1.Object()
], Collateral_UserBase);
exports.Collateral_UserBase = Collateral_UserBase;
let SignBase = class SignBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], SignBase.prototype, "Date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SignBase.prototype, "signer", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SignBase.prototype, "payload", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SignBase.prototype, "signPayload", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SignBase.prototype, "cryptoType", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SignBase.prototype, "cryptoKey", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], SignBase.prototype, "deal_conf", void 0);
SignBase = __decorate([
    fabric_contract_api_1.Object()
], SignBase);
exports.SignBase = SignBase;
// //Блок описания дополнительных параметров СУО НРД
// @Property()
// public returnVar: string;
// @Property()
// public shiftTermDate: string;
// @Property()
// public autoMargin: string;
//# sourceMappingURL=tradeBaseBlocks.js.map