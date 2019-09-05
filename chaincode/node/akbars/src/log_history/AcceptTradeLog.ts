/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class AcceptTradeLog  {
    @Property()
    public nameMethos: string;
    @Property()
    public typeOrg: string;
    @Property()
    public dateTime: number;
}