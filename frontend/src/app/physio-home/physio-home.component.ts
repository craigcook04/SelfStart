import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-physio-home',
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css'],
  providers: [PhysioHomeService]
})

export class PhysioHomeComponent implements OnInit {
  
  physio: any;
  today: Date;
  timeOfDay: string;
  activated: any;
  appointments: any[];
  panelOpenState: boolean = false;
  
  constructor(private router: Router, private physioHomeService: PhysioHomeService, private cookieService: CookieService) { }
  
  ngOnInit() {
    //var j = 0;
    var today = new Date();
    this.timeOfDay = this.getTimeOfDay();
    // this.cookieService.set('ID', "5a9dcb37b06b922a572fb840");
    this.physio = this.physioHomeService.GetPhysio(this.cookieService.get('ID')).subscribe(data =>{
      console.log(data);
      var obj: any = data;
      obj = obj.docs;
      this.physio = obj;
    })
    this.appointments = [];
    //this.appoint = [];
    console.log(today);
     this.physioHomeService.GetAppointments(today).subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });
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
