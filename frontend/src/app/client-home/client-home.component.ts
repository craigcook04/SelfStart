import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { CookieService } from 'ngx-cookie-service';
import { RehabPlansService } from '../rehab-plans.service';
import { MatSnackBar } from '@angular/material';

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
  currProgress: any = 69;

  constructor(private patientService: PatientService,
              private cookieService: CookieService,
              private planService: RehabPlansService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.timeOfDay = this.getTimeOfDay();
    this.cookieService.set('stupidID', "5ab0007926bba10fad373817");
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
    })
    this.patientService.GetPatientApppointments(this.cookieService.get('ID')).subscribe(data =>{
      let obj: any = data;
      this.appointments = obj.appointment;
    })
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
