import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';

@Component({
  selector: 'app-physio-home',
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css'],
  providers: [PhysioHomeService]
})

export class PhysioHomeComponent implements OnInit {
  
  activated: any;
  appointments: any[];
  panelOpenState: boolean = false;
  
  constructor(private router: Router, private physioHomeService: PhysioHomeService) { }
  
  //view: string = 'month';
  //viewDate: Date = new Date();
  //events: CalendarEvent[] = [];
  //clickedDate: Date;
  
  //events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;
  //activeDayIsOpen: boolean = false;

  
  //events: any;
  //items: Array<CalendarEvent<{ time: any }>> = [];
  
  ngOnInit() {
    //var j = 0;
    var today = new Date();
    this.appointments = [];
    //this.appoint = [];
    console.log(today);
     this.physioHomeService.getAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
      /*for(let i=0; i<this.appointments.length; i++) {
        if(this.appointments[i].date == today){
          this.appoint[j]=this.appointments[i];
          j++
        }*/
        /*for(let i=0; i<appointment.data.length; i++) {
          this.items.push(
          {
            title: appointment.data[i].name,
            start: new Date(appointments.data[i].date),
            color: colors.blue,
            meta: {
              time: appointments.data[i].date
            }
          });
          this.events = this.items;
        }*/
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
  
  goToCalendar(){
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
    
  }
}
