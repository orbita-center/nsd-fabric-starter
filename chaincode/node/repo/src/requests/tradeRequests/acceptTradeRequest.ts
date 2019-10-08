/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class AcceptTradeRequest  {
    @Property()
    public dealNum: string;
    @Property()
    public partyRole: string;
    @Property()
    public Date: number;
    @Property()
    public User: string;

}