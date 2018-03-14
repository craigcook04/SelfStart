import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MomentModule} from 'angular2-moment/moment.module';
import * as moment from 'moment';
import { AppointmentsService } from '../appointments.service';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, AfterViewInit {
  
  cells: Object[];
  dateSelected: any;
  currentWeek = 0;
  currentlyHighlighted: any;
  isSelected;
  bookedDates: any[];
  timeIndex: any; 

  constructor(private modalService: NgbModal,
              private router: Router,
              private apptService: AppointmentsService) { 
  }

  ngOnInit() {
    this.cells = new Array(37); //Create 37 time slots
    this.dateSelected = moment().startOf('week').format('LL') + " - " + moment().endOf('week').format('LL'); //set the range for the current week initially
    this.refreshCalendar(); //populate calendar

  }
  
  ngAfterViewInit(){
    //document.getElementById('slot14').setAttribute("class", "taken");
    this.apptService.GetAllAppointments().subscribe(data =>{
      var retObj: any = data; //Get all the appointements (like every one). -- will search by date here eventually
      this.bookedDates = Object.assign([], data.appointment); //assigns all appointements to bookedDates
      console.log(this.bookedDates);
      
      for(var i = 0; i < this.bookedDates.length; i++ ){
        if(moment(this.bookedDates[i].date).isSameOrAfter(moment().add(this.currentWeek, 'weeks').startOf('week').format('YYYY-MM-DD')) && moment(this.bookedDates[i].date).isSameOrBefore(moment().add(this.currentWeek, 'weeks').endOf('week').format('YYYY-MM-DD'))){
          var currDate = moment(this.bookedDates[i].date) //creates moment object out of string date
          var dayNum = currDate.day(); //this gets the day of the week in numerical form 0 = sunday -> 6=saturday
          
          //figure out how many 15-minute intervals are needed to get to time
          
          
          
          var timeNum = ""; //DO THIS STILL vv
          var takenSlot = "slot" + dayNum + ""; //slot0{{i}}, slot1{{i}} ...etc
          document.getElementById(takenSlot).classList.remove("bg-primary");
          document.getElementById(takenSlot).className = "bg-warning";
          console.log(dayNum);
        }
      }
    });
  }
  
  choosenSlot(day: any, indx: any){ //day is hard coded, index isnt
    this.isSelected = true; //If one is selected they cant select another
    this.timeIndex = indx; //keeping variable with selected index
    day = Number(day) - 1;
    this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
    console.log(this.currentlyHighlighted);
    this.apptService.AddAppointment(this.currentlyHighlighted, 'test69', 'test69').subscribe(data =>{
      console.log(data);
    });
  }
  
  refreshCalendar(){
    this.apptService.GetAllAppointments().subscribe(data =>{
      var retObj: any = data; //Get all the appointements (like every one). -- will search by date here eventually
      this.bookedDates = Object.assign([], data.appointment); //assigns all appointements to bookedDates
      console.log(this.bookedDates);
      
      for(var i = 0; i < this.bookedDates.length; i++ ){
        if(moment(this.bookedDates[i].date).isSameOrAfter(moment().add(this.currentWeek, 'weeks').startOf('week').format('YYYY-MM-DD')) && moment(this.bookedDates[i].date).isSameOrBefore(moment().add(this.currentWeek, 'weeks').endOf('week').format('YYYY-MM-DD'))){
          var currDate = moment(this.bookedDates[i].date) //creates moment object out of string date
          var dayNum = currDate.day(); //this gets the day of the week in numerical form
          console.log(dayNum);
        }
      }
    });
  }
  
  nextWeek(){ //function for when they click the next button -- this works perfectly
    this.currentWeek = this.currentWeek + 1;
    this.dateSelected = moment().add(this.currentWeek, 'weeks').startOf('week').format('LL') + " - " + moment().add(this.currentWeek, 'weeks').endOf('week').format('LL');
  }
  
  prevWeek(){ //function for the previous button -- also works perfectly
    if((this.currentWeek) === 0){
      return;
    }else{
      this.currentWeek = this.currentWeek - 1;
      this.dateSelected = moment().add(this.currentWeek, 'weeks').startOf('week').format('LL') + " - " + moment().add(this.currentWeek, 'weeks').endOf('week').format('LL');
    }
  }
  
  addAppointement(date: any, reason: string, other: string, patient: string){ //function to create a new appointement
    this.apptService.AddAppointment(date, reason, other).subscribe(data =>{
      console.log(data);
    })
  }
}
