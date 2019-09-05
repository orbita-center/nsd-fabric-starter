/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class AcceptTradeRequest  {
    @Property()
    public tradeId: string;
    @Property()
    public typeOrg: string;
    @Property()
    public dateTime: number;
    @Property()
    public whoMadeChanges: string;

}