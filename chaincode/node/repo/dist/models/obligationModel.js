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
const fabric_contract_api_1 = require("fabric-contract-api");
const performanceStatus_1 = require("../enums/performanceStatus");
const obligationPartRepo_1 = require("../enums/obligationPartRepo");
let Obligation = class Obligation {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "typeObject", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "id", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "idTrade", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "dateAdded", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "initiator", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "baseDescription", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "deal_amount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "quantitySecurities", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "dateExecution", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Obligation.prototype, "textDescription", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "performanceStatus", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Obligation.prototype, "obligationPartRepo", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Boolean)
], Obligation.prototype, "is_revaluation", void 0);
Obligation = __decorate([
    fabric_contract_api_1.Object()
], Obligation);
exports.Obligation = Obligation;
//# sourceMappingURL=obligationModel.js.map