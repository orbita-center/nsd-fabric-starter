/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class CloseTradeRequest {
    @Property()
    public contrID: string;
    @Property()
    public date: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public CommitmentID1: string;
    @Property()
    public CommitmentID2: string;
}
