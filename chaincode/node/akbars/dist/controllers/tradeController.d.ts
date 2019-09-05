import { Context, Contract } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
import { Trade } from '../models/tradeModel';
import { DataResult } from '../models/dataResult';
import { AddPriceToTradeResponse } from '../responses/addPriceToTradeResponse';
export declare class TradeContract extends Contract {
    parseStateQueryIterator(stateQueryIterator: Iterators.StateQueryIterator): Promise<any[]>;
    isExists(ctx: Context, tradeId: string): Promise<boolean>;
    addTrade(ctx: Context, addTradeRequestStr: string): Promise<DataResult<string>>;
    viewTrade(ctx: Context, tradeId: string): Promise<DataResult<Trade>>;
    viewListTrade(ctx: Context): Promise<DataResult<Trade[]>>;
    addPriceToTrade(ctx: Context, addPriceToTradeRequestStr: string): Promise<DataResult<AddPriceToTradeResponse>>;
    acceptTrade(ctx: Context, acceptTradeRequestStr: string): Promise<DataResult<string>>;
    addSignToTrade(ctx: Context, addSignToTradeRequestStr: string): Promise<DataResult<string>>;
    updTrade(ctx: Context, _updTradeRequestStr: string): Promise<DataResult<string>>;
    closeTrade(ctx: Context, closeTradeRequestStr: string): Promise<DataResult<string>>;
    setTradeIsEarly(ctx: Context, idTrade: string, isEarly: boolean, whoMadeChanges: string): Promise<DataResult<string>>;
    getTradeIsEarly(ctx: Context, idTrade: string): Promise<DataResult<string>>;
}
