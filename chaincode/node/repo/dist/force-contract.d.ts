/// <reference types="node" />
import { Context, Contract } from 'fabric-contract-api';
import { Force } from './force';
import { Iterators } from 'fabric-shim';
export declare class ForceContract extends Contract {
    forceExists(ctx: Context, forceId: string): Promise<boolean>;
    createForce(ctx: Context, forceId: string, typeObject: string, value: string): Promise<void>;
    readForce(ctx: Context, typeObject: string, forceId: string): Promise<Buffer>;
    readForce_v2(ctx: Context, typeObject: string, forceId: string): Promise<string>;
    readForce_v1(ctx: Context, typeObject: string, forceId: string): Promise<string>;
    readForce_v3(ctx: Context, typeObject: string, forceId: string): Promise<Buffer>;
    readForce_v31(ctx: Context, typeObject: string, forceId: string): Promise<Array<Force>>;
    readForce1(ctx: Context, typeObject: string, forceId: string): Promise<Buffer>;
    readForce2(ctx: Context, typeObject: string, forceId: string): Promise<Force>;
    readForce_vv1(ctx: Context, typeObject: string, forceId: string): Promise<string>;
    readForce_vv2(ctx: Context, typeObject: string, forceId: string): Promise<string>;
    readForce_vv3(ctx: Context, typeObject: string, forceId: string): Promise<string>;
    updateForce(ctx: Context, forceId: string, newValue: string): Promise<void>;
    deleteForce(ctx: Context, forceId: string): Promise<void>;
    iteratorToList(iterator: Iterators.CommonIterator): Promise<any[]>;
    readForce_V20(ctx: Context, typeObject: string, forceId: string): Promise<string>;
}
