import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  public paymentAmount: any;

  ngOnInit() {
    paypal.Button.render(this.paypalConfig, '#paypal-button-container');
  }

  SetPrice(value: any){
    this.paymentAmount = value;
  }

  GetPrice(): any{
    return this.paymentAmount;
  }

  paypalConfig:  any =  {
      env: 'sandbox', // sandbox | production
      // Paypal custom styling
      style: {
        label: 'paypal',
        size:  'medium',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        color: 'blue',     // gold | blue | silver | black
        tagline: false    
    },
      // PayPal Client IDs - replace with your own
      client: {
        sandbox: 'ASewACzIceIwQug016WZc-thKQg4RWSSY_eZFOjAzKB9bu3Cw2u0CogzKktitI8jQ7AJN3zmuyrXAxRP',
        production: ''
      },
      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,
      // payment() is called when the button is clicked
      payment: function(data, actions) {
      // Make a call to the REST api to create the payment
        return actions.payment.create({
          payment: {
            transactions: [{ amount: { total: '0.01', currency: 'CAD' }}]
          }
        });
      },
      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {
        // Make a call to the REST api to execute the payment
        let helper = this.paymentService;
          return actions.payment.execute().then(helper, (data) => {
            helper.StorePaymentSync(data);
          })
      },

      onError: function(err, actions){
        if (err === 'INSTRUMENT_DECLINED') {
          window.alert("They Payment Method Was Declined, Please Try Again.");
          actions.restart();
        }
        console.log(err);
      }
  }

  StorePayment(data: any){
    console.log(data);
    this.paymentService.StorePayment(data).subscribe(data => {
      console.log(data);
    })
  }

}
