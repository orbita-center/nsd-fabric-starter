/*
 * SPDX-License-Identifier: Apache-2.0
 */

export { HistoryContract } from './controllers/historyController';

export { TradeContract } from './controllers/tradeController';

export { ObligationContract } from './controllers/obligationController';

import { AppContract } from './controllers/appController';
export { AppContract } from './controllers/appController';



export const contracts: any[] = [AppContract  ];