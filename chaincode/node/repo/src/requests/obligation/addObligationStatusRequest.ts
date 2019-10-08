/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class AddObligationStatusRequest {
    @Property()
    public contrID: string;
    @Property()
    public CommitmentID: string;
    @Property()
    public DateTime: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public TextDescription: string;
    @Property()
    public PerformanceStatus: number;
}


