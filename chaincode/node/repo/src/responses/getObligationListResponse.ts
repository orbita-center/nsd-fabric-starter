import { Object, Property } from 'fabric-contract-api';
import { PerformanceStatus } from '../enums/performanceStatus';


@Object()
export class GetObligationListResponse {
   
    @Property()
    public CommitmentID: string;
    @Property()
    public DateTime: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public TextDescription: string;
    @Property()
    public Amount: number;
    @Property()
    public QuantitySecurities: number;
    @Property()
    public PerformanceStatus: PerformanceStatus;    

}


