import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PaymentService {

  constructor( private httpClient: HttpClient ) { }

  StorePayment(paypalObj: any): any{
    var body = {
      dayTimeStamp: paypalObj.create_time,
      amount: paypalObj.transactions[0].amount.total,
      note: "Paypal ID is: " + paypalObj.id,
      patient: paypalObj.payer.email
    }
    var url = '/api/payments'
    return this.httpClient.post(url, body);
  }

  StorePaymentSync( paypalObj: any ){
   console.log(paypalObj + "!!!!!"); 
  }

}
