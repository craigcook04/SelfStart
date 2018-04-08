import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CookieService } from 'ngx-cookie-service';
import { PatientService } from '../patient.service';
import { AssessmentTestService } from '../assessment-test.service';
import { PhysiotherapistService } from '../physiotherapist.service';

@Component({
  selector: 'app-physio-home',
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css'],
  providers: [PhysioHomeService]
})

export class PhysioHomeComponent implements OnInit {
  
  physio: any;
  today: Date;
  format: any;
  timeOfDay: string;
  activated: any;
  appointments: any[];
  panelOpenState: boolean = false;
  numbPatients: any;
  pendingTests: any;
  numbTests: any;
  display: boolean = false;
  totalCompleted: any;
  
  constructor(private router: Router,
              private physioService: PhysiotherapistService,
              private cookieService: CookieService,
              private patientService: PatientService,
              private testService: AssessmentTestService,
              private physioHomeService: PhysioHomeService) { }
  
  ngOnInit() {
    this.today = new Date();
    //this.format = this.today.toISOString();
    this.format = this.formatDate(this.today);
    this.timeOfDay = this.getTimeOfDay();
    // this.cookieService.set('ID', "5a9dcb37b06b922a572fb840");
    this.physioService.GetPhysioByUserID().subscribe(data =>{
      console.log(data);
      var obj: any = data;
      obj = obj.physio;
      this.physio = obj;

      this.patientService.getPhysioPatients(this.physio._id).subscribe(data =>{
        let obj: any = data;
        this.numbPatients = obj.total;
      })

      this.testService.GetOldestTests().subscribe(data => {
        let obj: any = data;
        console.log(obj.total);
        let length;
        if(obj.total > 5){
          length = 5;
        }
        else{
          length = obj.total;
        }
        this.numbTests = length;
        this.totalCompleted = obj.total;
        this.pendingTests = obj.docs.splice(0, 5);
      })


      this.physioHomeService.GetAppointments(this.format).subscribe(data =>{
        console.log(data);
        var retObj: any = data;
        this.appointments = retObj.appointment;
      })
    })
    this.appointments = [];
    //this.appoint = [];
  }

  Show(){
    console.log(this.display);
    this.display = !this.display;
  }
  
  show(appointment: any){
    if(this.activated == appointment){
      this.activated = null;
    }
    else{
      this.activated = appointment;
    }
    console.log(this.activated);
  }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }
  
  /*goToCalendar(){
    this.router.navigate(['../calendar']);
  }
  goToPatients(){
    this.router.navigate(['../client']);
  }
  goToExercises(){
    this.router.navigate(['../exercises']);
  }
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }
  goToTests(){
    this.router.navigate(['../assessmenttest']);
  }
  goToReports(){
  
  }*/
}
