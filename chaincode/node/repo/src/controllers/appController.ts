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


    //"{ \"deal_collateral\": { \"Sec_discount\": 10, \"Sec_price_types_priority\": \"124325\", \"Sec_quantity\": 100000, \"sec_code\": \"code123\", \"sec_isin\": \"isin123\", \"sec_name\": \"name123\" }, \"creditor\": { \"depcode\": \"11\", \"short_name\": \"name11\" }, \"debitor\": { \"depcode\": \"11\", \"short_name\": \"name11\" }, \"ObligNum1\": \"com1v10\", \"ObligNum2\": \"com2v10\", \"master_agreement\": { \"repcode\": \"code123\", \"date\": 1560000190 }, \"suo_params\": { \"Deal_auto_margin\": \"Y\", \"Deal_return_var\": \"Deal_return_var\", \"Deal_reuse\": \"Y\", \"Deal_shift_term_date\": \"Deal_shift_term_date\" }, \"user\": \"admin123\", \"number\": \"num1244\", \"dealNum\": \"num1244\", \"trade_date\": 1560000190, \"first_part_date\": 1560000190, \"second_part_date\": 1560000190, \"deal_amount\": 1000000, \"deal_cur\": \"BTC\", \"first_part_type\": \"DVP1\", \"Threshold_low\": 5, \"Threshold_high\": 5, \"rate\": 10, \"int_meth_type\": \"365/366\" }"
    @Transaction()
    @Returns('any')
    public async newDeal(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addTrade(ctx,param);
        return result;
    }



    @Transaction(false)
    @Returns('any')
    public async getDeal(ctx: Context, param: string): Promise<any> {
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


   //"{ \"User\": \"admin\", \"dealNum\": \"num1244\", \"date\": 12421412412, \"sec_isin\": \"352532rf32\", \"sec_name\": \"352532rf32\", \"market_price\": 0.9, \"market_price_type\": \"352532rf32\", \"market_price_cur\": \"352532rf32\", \"price_date\": 12421412412, \"coupon_income\": 0, \"income_cur\": \"352532rf32\", \"price\": 0.9, \"price_cur\": \"352532rf32\", \"oblID\": \"352532rf32\" }"
    @Transaction(false)
    public async addPriceToContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addPriceToTrade(ctx,param);
        return result;
    }

    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"partyRole\":\"creditor\", \"User\":\"admin123\" }"
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"partyRole\":\"debitor\", \"User\":\"admin123\" }"
    @Transaction()
    @Returns('any')
    public async confirmDeal(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.acceptTrade(ctx,param);
        return result;
    }


    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"signer\":\"admin123\",\"partyRole\":\"creditor\", \"payload\":\"creditor\", \"payload\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"signer\":\"admin123\", \"partyRole\":\"debitor\", \"payload\":\"debitor\", \"payload\":\"ewgergwbgilbwevew\", \"signPayload\":\"325326126126126126161616\", \"cryptoType\":\"32532652esbs\", \"cryptoKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    @Transaction()
    @Returns('any')
    public async signDeal(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.addSignToTrade(ctx,param);
        return result;
    }


    //"{ \"dealNum\":\"num1244\", \"Date\":12435111, \"ObligNum1\":\"com1vv10\", \"ObligNum2\":\"com2vv10\", \"User\":\"admin123\" }"
    @Transaction()
    @Returns('any')
    public async closeContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.closeTrade(ctx,param);
        return result;
    }


    //"{ \"User\": \"admin123\", \"dealNum\": \"num1244\", \"DateChange\": 12435111, \"deal_amount\": 0, \"quantitySecurities\": 12 }"
    @Transaction()
    @Returns('any')
    public async updContract(ctx: Context, param: string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.updTrade(ctx,param);
        return result;
    }
    

    @Transaction()
    @Returns('any')
    public async setContractIsEarly(ctx: Context, idTrade: string, isEarly:boolean,User:string): Promise<any> {
        var tadeContr= new TradeContract();
        var result =await tadeContr.setTradeIsEarly(ctx,idTrade,isEarly,User);
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
   //"{ \"dealNum\":\"num1244\", \"commitmentID\":\"com1v10\", \"date\":1560082367, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
   //"{ \"dealNum\":\"num1244\", \"commitmentID\":\"com2v10\", \"date\":1560082368, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"

   ////for close
   //"{ \"dealNum\":\"num1244\", \"commitmentID\":\"com1vv10\", \"date\":1560082367, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
   //"{ \"dealNum\":\"num1244\", \"commitmentID\":\"com2vv10\", \"date\":1560082368, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":0 }"
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