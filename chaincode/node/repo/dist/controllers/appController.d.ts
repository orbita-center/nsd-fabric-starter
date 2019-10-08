import { Context, Contract } from 'fabric-contract-api';
export declare class AppContract extends Contract {
    isExists(ctx: Context, param: string): Promise<any>;
    newDeal(ctx: Context, param: string): Promise<any>;
    getDeal(ctx: Context, param: string): Promise<any>;
    viewListContract(ctx: Context): Promise<any>;
    addPriceToContract(ctx: Context, param: string): Promise<any>;
    confirmDeal(ctx: Context, param: string): Promise<any>;
    signDeal(ctx: Context, param: string): Promise<any>;
    closeContract(ctx: Context, param: string): Promise<any>;
    updContract(ctx: Context, param: string): Promise<any>;
    setContractIsEarly(ctx: Context, idTrade: string, isEarly: boolean, User: string): Promise<any>;
    getContractIsEarly(ctx: Context, param: string): Promise<any>;
    addHistoryToContract(ctx: Context, param: string): Promise<any>;
    viewHistory(ctx: Context, param: string): Promise<any>;
    getHistoryFromContract(ctx: Context, param: string): Promise<any>;
    viewObligation(ctx: Context, param: string): Promise<any>;
    addObligationStatus(ctx: Context, param: string): Promise<any>;
    getObligationList(ctx: Context, param: string): Promise<any>;
}
