import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CalendarEvent } from 'angular-calendar';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
import { Observable } from 'rxjs/Observable';
import { PhysiotherapistService } from '../physiotherapist.service';
import { CookieService } from 'ngx-cookie-service';

interface Appointment {
  date: Date
  reason: string;
  other: string;
  patient: string;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
  providers: [PhysioHomeService],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {
  
  //appointments: any[];
  view: string = 'month';
  viewDate: Date = new Date();
  //events: CalendarEvent[] = [];
  //clickedDate: Date;
  //asyncEvents$: Observable<CalendarEvent[]>;
  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;
  activeDayIsOpen: boolean = false;
  physio: any;
  today: any;
  timeOfDay: string;
  
  constructor(private router: Router, private http: HttpClient, private physioHomeService: PhysioHomeService,
              private cookieService: CookieService) { }
  
  ngOnInit() {
    /*this.appointments = [];
    this.physioHomeService.GetAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });*/

    this.getTimeOfDay();
    this.physioHomeService.GetPhysio(this.cookieService.get('ID')).subscribe(data =>{
      let obj: any = data;
      this.physio = obj.physiotherapist;
    })

    this.fetchEvents();
  }

  getTimeOfDay(): string{
    this.today = new Date();
    var hour = this.today.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }
  
  /*fetchEvents(){
    this.appointments = [];
    this.events = [];
    this.physioHomeService.GetAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
      for(var i=0; appointment.length; i++){
        events[i]=[{title:appointment[i].reason, color:blue, start:new Date(appointment[i].date)}];
      }
    });
  }
  
  events: CalendarEvent[] = [
    {
      title: 'Stephanie Pereira',
      color: colors.blue,
      start: new Date("2018-04-20")
    }
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }*/

   fetchEvents(): void {
    /*const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];*/
  
    /*this.asyncEvents$ = this.http.get<DateEvent[]>('api/appointment')
      .pipe(map(res => { 
        return res.map(appointment => { 
          return {
              title: appointment.reason,
              start: new Date(appointment.date),
              color: colors.blue,
              meta: {
                appointment
              },
              allDay: true
            };
        });
      }));*/
      
    this.events$ = this.http
      .get('api/appointment')
      .pipe(
        map(({ results }: { results: Appointment[] }) => {
          return results.map((appointment: Appointment) => {
            return {
              title: appointment.reason,
              start: new Date(appointment.date),
              color: colors.blue,
              meta: {
                appointment
              }
            };
          });
        })
      );
  }

  /*dayClicked({
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
  }*/

  /*eventClicked(event: CalendarEvent<{ appointment: Appointment }>): void {
    
  }*/
}
