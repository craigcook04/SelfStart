import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { AppointmentsService } from '../appointments.service';
import { Subject } from 'rxjs/Subject';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent,
         CalendarEventAction,
         CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addHours,
  subDays,
  addDays,
  format
} from 'date-fns';


  

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
  providers: [PhysioHomeService, AppointmentsService],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: any;
  @ViewChild('deleteModal') deleteModal: any;
  
  view: string = 'month';
  viewDate: Date = new Date();
  
  activeDayIsOpen: boolean = false;
  myAppointmentDates: Object[];
  myAppointments: Observable<Array<CalendarEvent<{ appointment: any }>>>;
  
  events$: Observable<Array<CalendarEvent<{ appointment: any }>>>;
  subscription: any;
  events: CalendarEvent[];
  
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times" (click)="open(deleteModal)"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  
  refresh: Subject<any> = new Subject();

  
  
  constructor(private router: Router, 
              private http: HttpClient, 
              private physioHomeService: PhysioHomeService,
              private apptService: AppointmentsService,
              private modalService: NgbModal) { 
                
                this.events$ = new Observable<Array<CalendarEvent<{ appointment: any }>>>();
                this.events = [];
              }
  
  ngOnInit() {
    this.fetchEvents();
  }
  
  
  
  fetchEvents(): void {
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
    
    this.events$ = this.apptService.GetAppointmentsByMonth("2018-04-04")
    .pipe(map(({appointment}: {appointment: any[]}) => {
      
        return appointment.map((appointment: any) => {
          
          var temp: CalendarEvent = {
            title: "test",
            start: new Date(appointment.date),
            color: this.colors.blue,
            actions: this.actions
          };
          this.events.push(temp);
          console.log("event: ");
          console.log(temp);
          return temp;
          
        });
      })
    );

      console.log(this.myAppointmentDates);
    }
    
    
    
    
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      //this.deleteModal.show();
      this.modalService.open(this.deleteModal, { size: 'lg' });
    }
    
    open(content){
      this.modalService.open(content, {size: "lg"});
    }
    
    
  
    addEvent(): void {
      this.events.push({
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });
      this.refresh.next();
    }
    
    eventClicked(event: CalendarEvent<{ appointment: any }>): void {
      console.log("pop up modal here");
      //this.modalData = { event, action };
      this.modalService.open(this.modalContent, { size: 'lg' });
    }
    
    
    
    
}
    
    // const params = new HttpParams()
    //   .set(
    //     'primary_release_date.gte',
    //     format(getStart(this.viewDate), 'YYYY-MM-DD')
    //   )
    //   .set(
    //     'primary_release_date.lte',
    //     format(getEnd(this.viewDate), 'YYYY-MM-DD')
    //   );
      //.set('api_key', '0ec33936a68018857d727958dca1424f');
    
    
    //this.events$ = 
    
    // this.apptService.GetAppointmentsByMonth(this.viewDate).subscribe(data =>{
    //   console.log("HERE: " + data);
    //   map(({ results }: { results: Appointment[] }) => {
    //       return results.map((appointment: Appointment) => {
    //         return {
    //           reason: appointment.reason,
    //           date: new Date(appointment.date),
    //           color: colors.yellow,
    //           meta: {
    //             appointment
    //           }
    //         };
    //       });
    //     })
    // })
  
  
  
  
  
    /*this.appointments = [];
    this.physioHomeService.GetAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });*/
  
  
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

   //fetchEvents(): void {
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
      
  //   this.events$ = this.http
  //     .get('api/appointment')
  //     .pipe(
  //       map(({ results }: { results: Appointment[] }) => {
  //         return results.map((appointment: Appointment) => {
  //           return {
  //             title: appointment.reason,
  //             start: new Date(appointment.date),
  //             color: colors.blue,
  //             meta: {
  //               appointment
  //             }
  //           };
  //         });
  //       })
  //     );
  // }

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
