import { PerformanceStatus } from '../enums/performanceStatus';
import { ObligationPartRepo } from '../enums/obligationPartRepo';
export declare class Obligation {
    typeObject: string;
    id: string;
    idTrade: string;
    dateAdded: number;
    initiator: string;
    baseDescription: string;
    deal_amount: number;
    quantitySecurities: number;
    dateExecution: number;
    textDescription: string;
    performanceStatus: PerformanceStatus;
    obligationPartRepo: ObligationPartRepo;
    is_revaluation: boolean;
}
