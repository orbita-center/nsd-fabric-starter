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
let GetObligationListResponse = class GetObligationListResponse {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetObligationListResponse.prototype, "CommitmentID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetObligationListResponse.prototype, "DateTime", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetObligationListResponse.prototype, "WhoMadeChanges", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], GetObligationListResponse.prototype, "TextDescription", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetObligationListResponse.prototype, "Amount", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetObligationListResponse.prototype, "QuantitySecurities", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], GetObligationListResponse.prototype, "PerformanceStatus", void 0);
GetObligationListResponse = __decorate([
    fabric_contract_api_1.Object()
], GetObligationListResponse);
exports.GetObligationListResponse = GetObligationListResponse;
//# sourceMappingURL=getObligationListResponse.js.map