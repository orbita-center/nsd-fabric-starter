import { DataResult } from '../models/dataResult';
import { AddObligationStatusRequest } from '../requests/obligation/addObligationStatusRequest';
import { CreateObligationRequest } from '../requests/obligation/createObligationRequest';
export declare class ValidationObligation {
    static addObligationStatusObjectIsValid(data: AddObligationStatusRequest): DataResult<boolean>;
    static createObligationObjectIsValid(data: CreateObligationRequest): DataResult<boolean>;
}
