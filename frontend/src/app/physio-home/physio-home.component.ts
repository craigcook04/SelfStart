import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CalendarEvent } from 'angular-calendar';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { colors } from '../../demo-utils/colors';
import { map } from 'rxjs/operators/map';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';

interface Appointment {
  //date: date;
  name: string;
  reason: string;
  other: string;
}

@Component({
  selector: 'app-physio-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PhysioHomeService]
})

export class PhysioHomeComponent implements OnInit {

  constructor(private router: Router, private physioHomeService: PhysioHomeService) { }
  
  activated: any;
  appointments: any[];
  
  view: string = 'month';
  viewDate: Date = new Date();
  //events: CalendarEvent[] = [];
  //clickedDate: Date;
  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;
  activeDayIsOpen: boolean = false;

  
  //events: any;
  //items: Array<CalendarEvent<{ time: any }>> = [];
  
  ngOnInit() {
    this.appointments = [];
     this.physioHomeService.getAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
        /*for(let i=0; i<res.data.length; i++) {
          this.items.push(
          {
            title: res.data[i].name,
            start: new Date(res.data[i].date),
            color: {colors.blue},
            meta: {
              time: res.data[i].date
            }
          });
          this.events = this.items;
        }*/
    });
  }
  
  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ appointment: Appointment }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
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
    this.router.navigate(['../assessmentTest']);
  }
  goToReports(){
    
  }
}
