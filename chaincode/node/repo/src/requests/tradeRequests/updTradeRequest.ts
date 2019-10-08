/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class UpdTradeRequest {
    @Property()
    public contrID: string;
    @Property()
    public DateTimeChange: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public Amount: number;
    @Property()
    public QuantitySecurities: number;
}


