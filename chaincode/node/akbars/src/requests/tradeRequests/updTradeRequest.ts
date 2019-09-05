/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class UpdTradeRequest {
    @Property()
    public tradeId: string;
    @Property()
    public dateTimeChange: number;
    @Property()
    public whoMadeChanges: string;
    @Property()
    public amount: number;
    @Property()
    public quantitySecurities: number;
}


