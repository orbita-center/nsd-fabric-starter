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
const tradeBaseBlocks_1 = require("../../base_blocks/tradeBaseBlocks");
let Collateral_User = class Collateral_User extends tradeBaseBlocks_1.Collateral_UserBase {
};
Collateral_User = __decorate([
    fabric_contract_api_1.Object()
], Collateral_User);
exports.Collateral_User = Collateral_User;
let Deal_collateral = class Deal_collateral extends tradeBaseBlocks_1.CollateralBase {
};
Deal_collateral = __decorate([
    fabric_contract_api_1.Object()
], Deal_collateral);
exports.Deal_collateral = Deal_collateral;
let Master_Agreement = class Master_Agreement extends tradeBaseBlocks_1.Master_AgreementBase {
};
Master_Agreement = __decorate([
    fabric_contract_api_1.Object()
], Master_Agreement);
exports.Master_Agreement = Master_Agreement;
let SUO = class SUO extends tradeBaseBlocks_1.SUOBase {
};
SUO = __decorate([
    fabric_contract_api_1.Object()
], SUO);
exports.SUO = SUO;
let AddTradeRequest = class AddTradeRequest extends tradeBaseBlocks_1.TradeBase {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Collateral_User)
], AddTradeRequest.prototype, "debitor", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Collateral_User)
], AddTradeRequest.prototype, "creditor", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Master_Agreement)
], AddTradeRequest.prototype, "master_agreement", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Deal_collateral)
], AddTradeRequest.prototype, "deal_collateral", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", SUO)
], AddTradeRequest.prototype, "suo_params", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddTradeRequest.prototype, "ObligNum1", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddTradeRequest.prototype, "ObligNum2", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddTradeRequest.prototype, "user", void 0);
AddTradeRequest = __decorate([
    fabric_contract_api_1.Object()
], AddTradeRequest);
exports.AddTradeRequest = AddTradeRequest;
//# sourceMappingURL=addTradeRequest.js.map