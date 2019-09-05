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
], TradeBase.prototype, "id", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "deal_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "leg1_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "leg2_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "amount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "currency", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "leg1_deal_type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "threshold1", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "threshold2", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], TradeBase.prototype, "repo_rate", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], TradeBase.prototype, "int_meth", void 0);
TradeBase = __decorate([
    fabric_contract_api_1.Object()
], TradeBase);
exports.TradeBase = TradeBase;
let SUOBase = class SUOBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "reuse", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "return_var", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "shift_term_date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SUOBase.prototype, "auto_margin", void 0);
SUOBase = __decorate([
    fabric_contract_api_1.Object()
], SUOBase);
exports.SUOBase = SUOBase;
let Master_AgreementBase = class Master_AgreementBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Master_AgreementBase.prototype, "code", void 0);
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
], CollateralBase.prototype, "security_code", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "security_isin", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "security_name", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], CollateralBase.prototype, "quantity", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], CollateralBase.prototype, "discount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], CollateralBase.prototype, "price_types_priority", void 0);
CollateralBase = __decorate([
    fabric_contract_api_1.Object()
], CollateralBase);
exports.CollateralBase = CollateralBase;
let Collateral_UserBase = class Collateral_UserBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Collateral_UserBase.prototype, "code", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Collateral_UserBase.prototype, "short_name", void 0);
Collateral_UserBase = __decorate([
    fabric_contract_api_1.Object()
], Collateral_UserBase);
exports.Collateral_UserBase = Collateral_UserBase;
let ContrSignedBase = class ContrSignedBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], ContrSignedBase.prototype, "dateTime", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ContrSignedBase.prototype, "whoSigned", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ContrSignedBase.prototype, "text", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ContrSignedBase.prototype, "textSigned", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ContrSignedBase.prototype, "signatureAlgorithm", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ContrSignedBase.prototype, "publicKey", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], ContrSignedBase.prototype, "Confirmation", void 0);
ContrSignedBase = __decorate([
    fabric_contract_api_1.Object()
], ContrSignedBase);
exports.ContrSignedBase = ContrSignedBase;
// //Блок описания дополнительных параметров СУО НРД
// @Property()
// public returnVar: string;
// @Property()
// public shiftTermDate: string;
// @Property()
// public autoMargin: string;
//# sourceMappingURL=tradeBaseBlocks.js.map