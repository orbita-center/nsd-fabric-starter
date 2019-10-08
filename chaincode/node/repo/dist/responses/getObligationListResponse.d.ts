import { PerformanceStatus } from '../enums/performanceStatus';
export declare class GetObligationListResponse {
    CommitmentID: string;
    DateTime: number;
    WhoMadeChanges: string;
    TextDescription: string;
    Amount: number;
    QuantitySecurities: number;
    PerformanceStatus: PerformanceStatus;
}
