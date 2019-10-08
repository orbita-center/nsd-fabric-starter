import { DataResult } from '../models/dataResult';
import { CloseTradeRequest } from '../requests/tradeRequests/closeTradeRequest';
import { AcceptTradeRequest } from '../requests/tradeRequests/acceptTradeRequest';
import { AddTradeRequest } from '../requests/tradeRequests/addTradeRequest';
import { AddSignToTradeRequest } from '../requests/tradeRequests/addSignToTradeRequest';
import { UpdTradeRequest } from '../requests/tradeRequests/updTradeRequest';
import { AddPriceToTradeRequest } from '../requests/tradeRequests/addPriceToTradeRequest';
export declare class ValidationTrade {
    static addTradeObjectIsValid(data: AddTradeRequest): DataResult<boolean>;
    static addSingToTradeObjectIsValid(data: AddSignToTradeRequest): DataResult<boolean>;
    static acceptTradeObjectIsValid(data: AcceptTradeRequest): DataResult<boolean>;
    static closeTradeObjectIsValid(data: CloseTradeRequest): DataResult<boolean>;
    static updTradeObjectIsValid(data: UpdTradeRequest): DataResult<boolean>;
    static AddPriceToTradeRequestIsValid(data: AddPriceToTradeRequest): DataResult<boolean>;
}
