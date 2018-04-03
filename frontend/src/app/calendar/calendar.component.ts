import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { CalendarEvent } from 'angular-calendar';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { colors } from '../../demo-utils/colors';
//import { map } from 'rxjs/operators/map';
/*import {
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
import { Observable } from 'rxjs/Observable';*/

/*interface Appointment {
  date: Date
  reason: string;
  other: string;
  patient: string;
}*/

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
  providers: [PhysioHomeService],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {
  
  appointments: any[];
  view: string = 'month';
  viewDate: Date = new Date();
  //events: CalendarEvent[] = [];
  //clickedDate: Date;
  //events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;
  //activeDayIsOpen: boolean = false;
  
  constructor(private router: Router, private http: HttpClient, private physioHomeService: PhysioHomeService) { }
  
  ngOnInit() {
    //this.fetchEvents();
    this.appointments = [];
    this.physioHomeService.GetAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });
  }
  
  events: CalendarEvent[] = [
    /*{
      title: "Stephanie Pereira",
      color: colors.blue,
      start: new Date()
    }*/
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  
   /*fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
  
  const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'YYYY-MM-DD')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'YYYY-MM-DD')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
      .get('api/appointment', { params })
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

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }*/

}
