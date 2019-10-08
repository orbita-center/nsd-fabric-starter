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
let AddSignToTradeLog = class AddSignToTradeLog {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "nameMethos", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], AddSignToTradeLog.prototype, "Date", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "partyRole", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "payload", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "signPayload", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "cryptoType", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], AddSignToTradeLog.prototype, "cryptoKey", void 0);
AddSignToTradeLog = __decorate([
    fabric_contract_api_1.Object()
], AddSignToTradeLog);
exports.AddSignToTradeLog = AddSignToTradeLog;
//# sourceMappingURL=addSignToTradeLog.js.map