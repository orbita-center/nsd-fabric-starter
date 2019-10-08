/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
import { History} from '../models/historyModel';
import { Trade} from '../models/tradeModel';
import { DataResult} from '../models/dataResult';

import { GetBycontrID } from '../requests/tradeRequests/getBycontrID';

//import { StateQueryResponse, Iterators } from 'fabric-shim';


@Info({title: 'HistoryContract', description: 'My Smart Contract' })
export class HistoryContract extends Contract {

    public async parseStateQueryIterator(stateQueryIterator:Iterators.StateQueryIterator) : Promise<any[]>
    {
        const keys = [];
        const allResults = [];

        let res: Iterators.NextResult;
        while (res == null || !res.done) {
            res = await stateQueryIterator.next();

            if (res.value && res.value.value.toString()) {
                let parsedItem: any;

                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }

        await stateQueryIterator.close();

        return allResults;
    }

    @Transaction(false)
    @Returns('boolean')
    public async isExists(ctx: Context,objId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(objId);
        return (!!buffer && buffer.length > 0);
    }



    @Transaction()
    @Returns('DataResult<string>')
    public async addHistoryToTrade(ctx: Context, _historyStr: string, isFirstCreate="false"): Promise<DataResult<string>> {
        var result =new DataResult<string>();
        try{
            var _history = new History();
            try{
                _history =  JSON.parse(_historyStr) as History;
            }
            catch(e){
                throw new Error("Error parse json to History");
            }
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx,collectionTrade+_history.contrID);
            if (!isExistTrade &&isFirstCreate!="true") {
                throw new Error(`The deal ${_history.contrID} doesn't exists`);
            }
            const collection = (new History).constructor.name;
            const exists = await this.isExists(ctx,collection+_history.id);
            if (exists) {
                throw new Error(`The history ${_history.id} already exists`);
            }
            _history.typeObject=collection;
            var timestamp=+(ctx.stub.getTxTimestamp().getSeconds().toString());
            _history.DateTimeChange = timestamp;
            const buffer = Buffer.from(JSON.stringify(_history));
            await ctx.stub.putState(collection+_history.id,buffer);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }

    @Transaction(false)
    @Returns('DataResult<History>')
    public async viewHistory(ctx: Context, historyId: string): Promise<DataResult<History>> {
        var result =new DataResult<History>();
        try{
            const collection = (new History).constructor.name;
            const exists = await this.isExists(ctx,collection+historyId);
            if (!exists) {
                throw new Error(`The history ${historyId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection+historyId);
            const history = JSON.parse(buffer.toString()) as History;
            result.withData(history);
            return result;
        }
        catch(e){
            result.withError(e);
            return result;
        }
    }




    @Transaction(false)
    @Returns('DataResult<any[]>')
    //query: `{\"selector\":{\"${history.contrID}}\":\"${dealNum}\"}}`
    public async getHistoryFromTrade(ctx: Context, contrID: string): Promise<DataResult<any[]>> {
        var result =new DataResult<any[]>();
        try{
            // var _getBycontrID = new GetBycontrID();
            // try {
            //     _getBycontrID = JSON.parse(getBycontrIDStr) as GetBycontrID;
            // }
            // catch (e) {
            //     throw new Error("Error parse json from request");
            // }
                
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx,collectionTrade+contrID);
            if (!isExistTrade) {
                throw new Error(`The deal ${contrID} doesn't exists`);
            }
            const collection = (new History).constructor.name;
            const buffer = await ctx.stub.getQueryResult( `{"selector":{"contrID":"${contrID}","typeObject":"${collection}"}}`);
            const history =await this.parseStateQueryIterator(buffer);
            result.withData(history);
            return result;
        }
        catch(e){
            result.withError(e);
            return result;
        }
    }

}
