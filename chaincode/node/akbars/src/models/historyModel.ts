/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class History {
    
    @Property()
    public typeObject: string;
    @Property()
    public id: string;
    @Property()
    public idTrade: string;
    @Property()
    public date: number;
    @Property()
    public initiator: string;
    @Property()
    public description: string;
    @Property()
    public whatHasChanged: string;
}
