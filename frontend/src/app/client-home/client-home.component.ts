import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { CookieService } from 'ngx-cookie-service';
import { RehabPlansService } from '../rehab-plans.service';
import { MatSnackBar } from '@angular/material';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  timeOfDay: string;
  today: Date;
  client: any;
  clientName: any;
  appointments: any;
  currPlan: any;
  currTest: any;
  //currProgress: any = 69;
  completedTests: any;
  accountAge: any = 0;

  constructor(private patientService: PatientService,
              private cookieService: CookieService,
              private planService: RehabPlansService,
              private snackBar: MatSnackBar,
              private accountService: UserAccountsService) { }

  ngOnInit() {
    console.log(this.cookieService.get('ID'));
    this.timeOfDay = this.getTimeOfDay();
    //this.cookieService.set('stupidID', "5ab0007926bba10fad373817");
    this.client = this.patientService.GetPatientInfo(this.cookieService.get('ID')).subscribe(data =>{
      console.log(data);
      var obj: any = data;
      obj = obj.patient;
      this.client = obj;
      this.currPlan = this.client.rehabPlan;
      if(obj.rehabPlan == null) {
        return;
      }
      this.planService.GetCurrentAssesmentTest(obj.rehabPlan._id).subscribe(data =>{
        let obj: any = data;
        this.currTest = obj.rehabPlan.assessmentTests[0];
        console.log(this.currTest);
      })
      //this.accountService.GetInfoDates(this.cookieService.get('ID'))
    })
    this.patientService.GetPatientApppointments(this.cookieService.get('ID')).subscribe(data =>{
      let obj: any = data;
      this.appointments = obj.appointment;
    })

    // let day = new Date().getTime() - this.client.dateRegistered.getTime();
    // this.accountAge = day;
    // console.log(day);
  }

  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }

  openSnackBar() {
    this.snackBar.open('Click the begin assessment button to get started.', "Ok");
  }
}
