import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-physio-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css'],
  providers: [PhysioHomeService]
})
export class PhysioHomeComponent implements OnInit {

  constructor(private router: Router, private physioHomeService: PhysioHomeService) { }
  
  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  clickedDate: Date;
  
  activated: any;
  appointments: any[];
  
  ngOnInit() {
    this.appointments = [];
     this.physioHomeService.getAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });
  }
  show(appointment: any){
    if(this.activated == appointment){
      this.activated =null;
    }
    else{
      this.activated = appointment;
    }
    console.log(this.activated);
  }
  
  goToExercises(){
    this.router.navigate(['../exercises']);
  }
  goToPatients(){
    this.router.navigate(['../client']);
  }
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }
  goToTests(){
    
  }
  goToReports(){
    
  }
}
