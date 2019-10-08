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
const force_1 = require("./force");
let ForceContract = class ForceContract extends fabric_contract_api_1.Contract {
    async forceExists(ctx, forceId) {
        const buffer = await ctx.stub.getState(forceId);
        return (!!buffer && buffer.length > 0);
    }
    async createForce(ctx, forceId, typeObject, value) {
        const exists = await this.forceExists(ctx, forceId);
        if (exists) {
            throw new Error(`The force ${forceId} already exists`);
        }
        const force = new force_1.Force();
        force.value = value;
        force.typeObject = typeObject;
        const buffer = Buffer.from(JSON.stringify(force));
        await ctx.stub.putState(forceId, buffer);
    }
    async readForce(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.value;
        return buffer;
    }
    async readForce_v2(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.getKey();
        //const force = JSON.parse(buffer.toString()) as Array<Force>;
        return buffer;
    }
    async readForce_v1(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.key;
        return buffer;
    }
    async readForce_v3(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.getValue();
        // var item = buffer.toJSON();
        // const force = JSON.parse(item.toString()) as Array<Force>;
        return buffer;
    }
    async readForce_v31(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.getValue();
        var item = buffer.toJSON();
        const force = JSON.parse(item.toString());
        return force;
    }
    async readForce1(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        const buffer = await ctx.stub.getState(forceId);
        const force = JSON.stringify(buffer);
        //return buffer.eventNames();
        return buffer;
    }
    async readForce2(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        const buffer = await ctx.stub.getState(forceId);
        const force = JSON.parse(buffer.toString());
        //return buffer.eventNames();
        return force;
    }
    async readForce_vv1(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.value;
        var values = buffer.values();
        return JSON.stringify(values);
    }
    async readForce_vv2(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const nextResul = await stateQueryIterator.next();
        var buffer = nextResul.value.value;
        var keys = buffer.keys();
        return JSON.stringify(keys);
    }
    async readForce_vv3(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const keys = [];
        const nextResul = await stateQueryIterator.next();
        // while()
        // for keysIter.HasNext() {
        //     key, _, iterErr := keysIter.Next()
        //     if iterErr != nil {
        //         return shim.Error(fmt.Sprintf("keys operation failed. Error accessing state: %s", err))
        //     }
        //     keys = append(keys, key)
        // }
        var buffer = nextResul.value.value;
        var entries = buffer.entries();
        return JSON.stringify(entries);
    }
    async updateForce(ctx, forceId, newValue) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        const force = new force_1.Force();
        force.value = newValue;
        const buffer = Buffer.from(JSON.stringify(force));
        await ctx.stub.putState(forceId, buffer);
    }
    async deleteForce(ctx, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        await ctx.stub.deleteState(forceId);
    }
    async iteratorToList(iterator) {
        const allResults = [];
        let res;
        while (res == null || !res.done) {
            res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                let parsedItem;
                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                }
                catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }
        await iterator.close();
        return allResults;
    }
    async readForce_V20(ctx, typeObject, forceId) {
        const exists = await this.forceExists(ctx, forceId);
        if (!exists) {
            throw new Error(`The force ${forceId} does not exist`);
        }
        //const buffer = await ctx.stub.getState(forceId);
        const stateQueryIterator = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${typeObject}"}}`);
        const keys = [];
        const allResults = [];
        let res;
        while (res == null || !res.done) {
            res = await stateQueryIterator.next();
            if (res.value && res.value.value.toString()) {
                let parsedItem;
                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                }
                catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }
        await stateQueryIterator.close();
        // const nextResul=await iteratorToList(stateQueryIterator);
        // var buffer= nextResul.value.value;
        //var entries = buffer.entries();
        return JSON.stringify(allResults);
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "forceExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "createForce", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Buffer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_v2", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_v1", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Buffer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_v3", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Force[]'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_v31", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Buffer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce1", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Force'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce2", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_vv1", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_vv2", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_vv3", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "updateForce", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "deleteForce", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ForceContract.prototype, "readForce_V20", null);
ForceContract = __decorate([
    fabric_contract_api_1.Info({ title: 'ForceContract', description: 'My Smart Contract' })
], ForceContract);
exports.ForceContract = ForceContract;
//# sourceMappingURL=force-contract.js.map