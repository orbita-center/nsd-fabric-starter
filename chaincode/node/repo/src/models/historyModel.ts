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
    public contrID: string;
    @Property()
    public DateTimeChange: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public Detailing: string;
    @Property()
    public WhatHasChanged: string;
}
