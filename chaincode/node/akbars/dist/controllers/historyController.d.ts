import { Context, Contract } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
import { History } from '../models/historyModel';
import { DataResult } from '../models/dataResult';
export declare class HistoryContract extends Contract {
    parseStateQueryIterator(stateQueryIterator: Iterators.StateQueryIterator): Promise<any[]>;
    isExists(ctx: Context, objId: string): Promise<boolean>;
    addHistoryToTrade(ctx: Context, _historyStr: string, isFirstCreate?: string): Promise<DataResult<string>>;
    viewHistory(ctx: Context, historyId: string): Promise<DataResult<History>>;
    getHistoryFromTrade(ctx: Context, tradeId: string): Promise<DataResult<any[]>>;
}
