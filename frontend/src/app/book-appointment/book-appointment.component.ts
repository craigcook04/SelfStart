import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core/';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { AppointmentsService } from '../appointments.service';
import { PaymentService } from '../payment.service';
import { CookieService } from 'ngx-cookie-service';
import { PatientService } from '../patient.service';


const URL = "/api/image/bookappointment";
const now = new Date();
declare let paypal: any;

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});

  timeOfDay: string;
  today: Date;
  invalidName: boolean = false;
  type: any;
  

  @ViewChild('dp') dp: NgbDatepicker;
  paymentAmount: any = '0';
  currContent: any;
  render1: boolean = false;
  render2: boolean = false;
  client: any;

  constructor(private modalService: NgbModal,
              private router: Router,
              private imageService: ImageService,
              private apptService: AppointmentsService,
              private paymentService: PaymentService,
              private cookieService: CookieService,
              private patientService: PatientService) { 
              }

  ngOnInit() {
    this.cookieService.set('ID', "5ab0007926bba10fad373817");
    this.client = this.patientService.GetPatientInfo(this.cookieService.get('ID')).subscribe(data =>{
      console.log(data);
      var obj: any = data;
      obj = obj.patient;
      this.client = obj;
    })
    this.timeOfDay = this.getTimeOfDay();
  }

  // open(content) {

  //   this.currContent = this.modalService.open(content, {size: "lg"});
  //   console.log(this.currContent);
  //   paypal.Button.render(this.paypalConfig, '#paypal-button-container');
  //   if(content._def.references.book != null && content._def.references.book === 2){
  //     this.paymentAmount = '0.01';
  //   this.modalService.open(content, {size: "lg"});
  //   }
  // }
  
  setType(t){
    this.apptService.setType(t);
  }

  determineAge(){
    console.log("HERE");
    var age = document.querySelector('dp').innerHTML;
    console.log(age);
  }


  open(content: any, value: any) {
    content.show();
    console.log(value);
    if(value === '0.01'){
      this.paymentAmount = value;
      this.currContent = "bookModal";
      this.type = "normal";
      this.apptService.setType(this.type);
    }
    if(value === '0.02'){
      this.paymentAmount = value;
      this.currContent = "initialModal";
      this.type = "initial";
      this.apptService.setType(this.type);
    }
    if(this.render1 === false && this.currContent === "bookModal"){
      paypal.Button.render(this.paypalConfig, '#paypal-button-container');
      this.render1 = true;
    }
    if(this.render2 === false && this.currContent === "initialModal"){
      paypal.Button.render(this.paypalConfig, '#paypal-button-container2');
      this.render1 = true;
    }
    
    //console.log(this.type); - RIGHT TYPE HERE
  }

  saveAppointment(patient, reason, other){
    this.apptService.AddAppointment(patient, reason, other).subscribe(data => {
      console.log(data);
      
    })
  }

  paypalConfig: any =  {
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
      //this is where Stephanie's paypal will go
      production: ''
    },
    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,
    // payment() is called when the button is clicked
    payment: (data, actions) => {
    // Make a call to the REST api to create the payment
      return actions.payment.create({
        payment: {
          transactions: [{ amount: { total: this.paymentAmount, currency: 'CAD' }}]
        }
      });
    },
    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: (data, actions) => {
      // Make a call to the REST api to execute the payment
      return actions.payment.execute().then((data) => {
        this.StorePayment(data);
      })
    },

    onError: function(err, actions){
      if (err === 'INSTRUMENT_DECLINED') {
        window.alert("They Payment Method Was Declined, Please Try Again.");
      }
      console.log(err);
    }
}

  StorePayment(data: any){
    this.paymentService.StorePayment(data, this.cookieService.get('ID')).subscribe(data => {
      console.log(data);
      this.currContent.hide();
    })
  }

  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }
  
}