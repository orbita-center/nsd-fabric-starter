/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class CloseTradeRequest {
    @Property()
    public tradeId: string;
    @Property()
    public dateTime: number;
    @Property()
    public whoMadeChanges: string;
    @Property()
    public commitmentID1: string;
    @Property()
    public commitmentID2: string;
}
