import { Context, Contract } from 'fabric-contract-api';
export declare class AppContract extends Contract {
    isExists(ctx: Context, param: string): Promise<any>;
    addContract(ctx: Context, param: string): Promise<any>;
    viewContract(ctx: Context, param: string): Promise<any>;
    viewListContract(ctx: Context): Promise<any>;
    addPriceToContract(ctx: Context, param: string): Promise<any>;
    acceptContract(ctx: Context, param: string): Promise<any>;
    addSignToContract(ctx: Context, param: string): Promise<any>;
    closeContract(ctx: Context, param: string): Promise<any>;
    setContractIsEarly(ctx: Context, idTrade: string, isEarly: boolean, whoMadeChanges: string): Promise<any>;
    getContractIsEarly(ctx: Context, param: string): Promise<any>;
    addHistoryToContract(ctx: Context, param: string): Promise<any>;
    viewHistory(ctx: Context, param: string): Promise<any>;
    getHistoryFromContract(ctx: Context, param: string): Promise<any>;
    viewObligation(ctx: Context, param: string): Promise<any>;
    addObligationStatus(ctx: Context, param: string): Promise<any>;
    getObligationList(ctx: Context, param: string): Promise<any>;
}
