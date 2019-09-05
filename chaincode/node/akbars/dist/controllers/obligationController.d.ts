import { Context, Contract } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
import { Obligation } from '../models/obligationModel';
import { DataResult } from '../models/dataResult';
export declare class ObligationContract extends Contract {
    parseStateQueryIterator(stateQueryIterator: Iterators.StateQueryIterator): Promise<any[]>;
    isExists(ctx: Context, objId: string): Promise<boolean>;
    createObligation(ctx: Context, _obligationStr: string, type: string): Promise<DataResult<string>>;
    viewObligation(ctx: Context, obligationId: string): Promise<DataResult<Obligation>>;
    addObligationStatus(ctx: Context, _addObligationStatusRequestStr: string): Promise<DataResult<string>>;
    getObligationList(ctx: Context, tradeId: string): Promise<DataResult<Obligation[]>>;
}
