import { HistoryContract } from './historyController';
import { ObligationContract } from './obligationController';
import { TradeContract } from './tradeController';
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';




@Info({title: 'AppContract', description: 'My Smart Contract' })
export class AppContract extends Contract {

    @Transaction(false)
    @Returns('any')
    public async isExists(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.isExists(ctx,param);
        return result;
    }


    //"{\"id\":\"123\",\"collateral\":{\"discount\":91,\"price_types_priority\":\"124325\",\"quantity\":100,\"security_code\":\"code123\",\"security_isin\":\"isin123\",\"security_name\":\"name123\"},\"collateral_Buyer\":{\"code\":\"11\",\"short_name\":\"name11\"},\"collateral_Seller\":{\"code\":\"11\",\"short_name\":\"name11\"},\"commitmentID1\":\"com1v7\",\"commitmentID2\":\"com2v7\",\"master_agreement\":{\"code\":\"code123\",\"date\":1560000190},\"suo\":{\"auto_margin\":\"Y\",\"return_var\":\"return_var\",\"reuse\":\"Y\",\"shift_term_date\":\"shift_term_date\"},\"whoMadeChanges\":\"admin123\", \"deal_num\":\"num1241\", \"deal_date\":1560000190, \"leg1_date\":1560000190, \"leg2_date\":1560000190, \"amount\":100000, \"currency\":\"BTC\", \"leg1_deal_type\":\"DVP1\", \"threshold1\":2.0, \"threshold2\":999.0, \"repo_rate\":10, \"int_meth\":\"365/366\"}"
    @Transaction()
    @Returns('any')
    public async addContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addTrade(ctx,param);
        return result;
    }



    @Transaction(false)
    @Returns('any')
    public async viewContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.viewTrade(ctx,param);
        return result;
    }


    @Transaction(false)
    @Returns('any')
    public async viewListContract(ctx: Context): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.viewListTrade(ctx);
        return result;
    }


   //"{ \"tradeId\":\"123\", \"date\":12421412412, \"whoMadeChanges\":\"admin\", \"security_isin\":\"352532rf32\", \"security_name\":\"352532rf32\", \"market_price\":\"352532rf32\", \"market_price_type\":\"352532rf32\", \"market_price_cur\":\"352532rf32\", \"price_date\":\"352532rf32\", \"coupon_income\":\"352532rf32\", \"income_cur\":\"352532rf32\", \"price\":\"352532rf32\", \"price_cur\":\"352532rf32\", \"oblID\":\"352532rf32\" }"
    @Transaction(false)
    public async addPriceToContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addPriceToTrade(ctx,param);
        return result;
    }

    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"typeOrg\":\"buyer\", \"whoMadeChanges\":\"admin123\" }"
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"typeOrg\":\"seller\", \"whoMadeChanges\":\"admin123\" }"
    @Transaction()
    @Returns('any')
    public async acceptContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.acceptTrade(ctx,param);
        return result;
    }


    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"buyer\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"seller\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    @Transaction()
    @Returns('any')
    public async addSignToContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addSignToTrade(ctx,param);
        return result;
    }

    // "{\"tradeId\":\"116\", \"amount\": 10, \"quantitySecurities\": 20, \"dateTimeChange\":12435111, \"whoMadeChanges\":\"admin123\"}"
    // @Transaction()
    // @Returns('any')
    // public async updTrade(ctx: Context, param: string): Promise<any> {
    //     var tadeContr= new TradeContract();
    //     var result =await tadeContr.updTrade(ctx,param);
    //     return result;
    // }


    //"{ \"tradeId\":\"123\", \"dateTime\":12435111, \"commitmentID1\":\"com1vv7\", \"commitmentID2\":\"com2vv7\", \"whoMadeChanges\":\"admin123\" }"
    @Transaction()
    @Returns('any')
    public async closeContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.closeTrade(ctx,param);
        return result;
    }


    @Transaction()
    @Returns('any')
    public async setContractIsEarly(ctx: Context, idTrade: string, isEarly:boolean,whoMadeChanges:string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.setTradeIsEarly(ctx,idTrade,isEarly,whoMadeChanges);
        return result;
    }

    @Transaction()
    @Returns('any')
    public async getContractIsEarly(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.getTradeIsEarly(ctx,param);
        return result;
    }

    

    @Transaction()
    @Returns('any')
    public async addHistoryToContract(ctx: Context, param: string): Promise<any> {
        var histContr= new HistoryContract();
        var result =await histContr.addHistoryToTrade(ctx,param);
        return result;
    }

    @Transaction(false)
    @Returns('any')
    public async viewHistory(ctx: Context, param: string): Promise<any> {
        var histContr= new HistoryContract();
        var result =await histContr.viewHistory(ctx,param);
        return result;
    }

  

    @Transaction(false)
    @Returns('any')
    public async getHistoryFromContract(ctx: Context, param: string): Promise<any> {
        var histContr= new HistoryContract();
        var result =await histContr.getHistoryFromTrade(ctx,param);
        return result;
    }

   
    @Transaction(false)
    @Returns('any')
    public async viewObligation(ctx: Context, param: string): Promise<any> {
        var obligContr= new ObligationContract();
        var result =await obligContr.viewObligation(ctx,param);
        return result;
    }


    @Transaction()
    @Returns('any')
   //"{ \"tradeId\":\"123\", \"commitmentID\":\"com1v7\", \"date\":1560082367, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
   //"{ \"tradeId\":\"123\", \"commitmentID\":\"com2v7\", \"date\":1560082368, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"

   ////for close
   //"{ \"tradeId\":\"123\", \"commitmentID\":\"com1vv7\", \"date\":1560082367, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
   //"{ \"tradeId\":\"123\", \"commitmentID\":\"com2vv7\", \"date\":1560082368, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
    public async addObligationStatus(ctx: Context, param :string): Promise<any> {
        var obligContr= new ObligationContract();
        var result =await obligContr.addObligationStatus(ctx,param);
        return result;
    }


    @Transaction(false)
    @Returns('any')
    public async getObligationList(ctx: Context, param: string): Promise<any> {
        var obligContr= new ObligationContract();
        var result =await obligContr.getObligationList(ctx,param);
        return result;
    }

}