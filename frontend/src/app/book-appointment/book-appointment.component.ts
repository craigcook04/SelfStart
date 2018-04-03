import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core/';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { PaymentService } from '../payment.service';
import { CookieService } from 'ngx-cookie-service';
import { PatientService } from '../patient.service';

const URL = "/api/image/bookappointment"
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
  paymentAmount: any = '0';
  currContent: any;
  client: any;
  selected = 'option2';
  constructor(private modalService: NgbModal,
              private router: Router,
              private imageService: ImageService,
              private paymentService: PaymentService,
              private cookieService: CookieService,
              private patientService: PatientService) { 
              }

  ngOnInit() {
    this.cookieService.set('stupidID', "5ab0007926bba10fad373817");
    this.client = this.patientService.GetPatientInfo(this.cookieService.get('ID')).subscribe(data =>{
      console.log(data);
      var obj: any = data;
      obj = obj.patient;
      this.client = obj;
    })
    this.timeOfDay = this.getTimeOfDay();
  }

  open(content: any, value: any) {
    content.show();
    console.log(value);
    if(value === '0.01'){
      this.paymentAmount = value;
      this.currContent = "bookModal";
    }
    if(value === '0.02'){
      this.paymentAmount = value;
      this.currContent = "initialModal";
    }
  }

  // sendInitialInfoSheet(makeChanges){

  //   var name: any = document.querySelector('inputName');
  //   name = name.value;

  //   //regex commands for input validation
  //   var badFormat = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //regex statement to limit bad characters in a username
  //   var badFormatWithNumbers =  /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/ //regex format to confirm input of first name and last name
  //   var badFormatWithLetters = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  //   var emailFormat =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   var validPhoneNumber = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
  //   var cannotContinue: boolean = false; //if there are any errors in the form this stops from sending the request from the server

  //   if(badFormat.test(name) || !name){
  //     var nameBox = document.getElementById('inputName').style.borderColor = "red";
  //     this.invalidName = true;
  //     cannotContinue = true;
  //   }

  //   if(cannotContinue){
  //     this.modalService.open(makeChanges, {size: 'lg'});
  //     return;
  //   }
  // }

  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }

}
