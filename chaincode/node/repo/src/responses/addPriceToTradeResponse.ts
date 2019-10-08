/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class AddPriceToTradeResponse  {
    @Property()
    public necesSUM: number;
    @Property()
    public rePurchasePriceCur: number;
    @Property()
    public allSumCollateral: number;

}