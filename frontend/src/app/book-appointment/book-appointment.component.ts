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
import { AssessmentTestService } from '../assessment-test.service';


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
  client: any;
  clientId: any;
  selected = 'option2';
  ratePain: any;
  weeklyPain: any;
  hasMoreThanOneSymptom: boolean;
  hasOtherMedicalCondition: boolean;
  medicalTraumas: boolean;

  constructor(private modalService: NgbModal,
              private router: Router,
              private imageService: ImageService,
              private apptService: AppointmentsService,
              private paymentService: PaymentService,
              private cookieService: CookieService,
              private patientService: PatientService,
              private assessmentTestService: AssessmentTestService) { 
              }


  ngOnInit() {
    this.cookieService.set('stupidID', "5ab0007926bba10fad373817");
    
    // this.patientService.GetPatient().subscribe(data =>{
    //   var temp: any = data;
    //   console.log(data);
    //   this.client = this.patientService.GetPatientInfo(temp.client._id).subscribe(data =>{
    //   //console.log(data);
    //   console.log("Client ID: " + temp.client._id);
    //   var obj: any = data;
    //   obj = obj.patient;
    //   this.client = obj;
    //   })
    // })
    
    
    
    this.timeOfDay = this.getTimeOfDay();
    this.ratePain = 0;
    this.weeklyPain = 0;
  }

  StorePainRating(num: any) {
    this.ratePain = num + 1;
  }

  StoreWeeklyPain(num: any) {
    this.weeklyPain = num + 1;
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


  }

  saveAppointment(reason, other){
    this.apptService.AddAppointment(this.cookieService.get('ID'), reason, other).subscribe(data => {
      console.log(data);
      
    })
  }

  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }

  moreThanOneSymptom(yesorno: boolean) {
    this.hasMoreThanOneSymptom = yesorno;
  }

  otherMedicalCondition(yesorno: boolean) {
    this.hasOtherMedicalCondition = yesorno;
  }

  otherMedicalTraumas(yesorno: boolean) {
    this.medicalTraumas = yesorno;
  }

  SubmitInitialInjuryForm(injuryarea: string, painScale: string, started: string, dateStarted: string, describe: string, aggravates: string, easePain: string, morningPain: string, eveningPain: string, treatment: string, explainOther: string, symptoms: string, explainTraumas:string, occupation: string, hobbies: string, goals: string ) {
    
    var userID = this.cookieService.get('ID');    
    var InitialiInjuryObject = {
      injuryarea: injuryarea,
      painScale: painScale,
      started: started,
      dateStarted: dateStarted,
      describe: describe,
      ratePain: this.ratePain,
      weeklyPain: this.weeklyPain,
      aggravates: aggravates,
      easePain: easePain,
      morningPain: morningPain,
      eveningPain: eveningPain,
      treatment: treatment,
      moreThanOneSymptom: this.hasMoreThanOneSymptom,
      hasOtherMedicalCondition: this.hasOtherMedicalCondition,
      describeOtherMedCondition: explainOther,
      symptoms: symptoms,
      medicalTraumas: this.medicalTraumas,
      explainTraumas: explainTraumas,
      occupation: occupation,
      hobbies: hobbies,
      goals: goals,
      userID: userID
    }

    this.assessmentTestService.CompletedInitialAppointment(InitialiInjuryObject).subscribe(data => {
      console.log(data);
    })
  }
  

}

