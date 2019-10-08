import { DataResult } from '../models/dataResult';
import { AddObligationStatusRequest } from '../requests/obligation/addObligationStatusRequest';
export declare class ValidationObligation {
    static addObligationStatusObjectIsValid(data: AddObligationStatusRequest): DataResult<boolean>;
}
