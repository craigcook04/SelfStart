import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
  dayIndex: any;

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
    this.apptService.GetAllAppointments().subscribe(data =>{
      var retObj: any = data; //Get all the appointements (like every one). -- will search by date here eventually
      this.bookedDates = Object.assign([], data.appointment); //assigns all appointements to bookedDates
      console.log(this.bookedDates);
      
      for(var i = 0; i < this.bookedDates.length; i++ ){
        if(moment(this.bookedDates[i].date).isSameOrAfter(moment().add(this.currentWeek, 'weeks').startOf('week')) && moment(this.bookedDates[i].date).isSameOrBefore(moment().add(this.currentWeek, 'weeks').startOf('week').add(7, 'days'))){
          var currDate = moment(this.bookedDates[i].date) //creates moment object out of string date
          var dayNum = currDate.day(); //this gets the day of the week in numerical form 0 = sunday -> 6=saturday
          var tempTime  = moment().add(this.currentWeek, 'weeks').startOf('week').add(dayNum, 'days').startOf('day').add(8.5, 'hours'); //get start of selected day
          var timeCount = 0;
          var nextSlot = 0;
          var secondSlot = 0;
          var countUp = true;
          //figure out how many 15-minute intervals are needed to get to time
          //** the work day starts at 830
          
          while(true){
            if(moment().add(this.currentWeek, 'weeks').startOf('week').add(dayNum, 'days').startOf('day').add(8, 'hours').add((30 + (timeCount*15)), 'minutes').isBefore(currDate)){
              
              timeCount = timeCount + 1; //will give me slot number
              nextSlot = timeCount + 1;
              secondSlot = nextSlot + 1;
            }
            else{
              break;
            }
          }
          
          console.log("made it here " + timeCount);
          var takenSlot = [("slot" + dayNum + timeCount), ("slot" + dayNum + nextSlot), ("slot" + dayNum + secondSlot)]; //slot0{{i}}, slot1{{i}} ...etc
          
          if(timeCount > 34){
            if(timeCount == 35){
              document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
              document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
            }else{
              document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
            }
          }else{
            document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
            document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
            document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm bg-muted chooseTime");
          }
          
          //console.log(dayNum);
        }
      }
    });
    
  }
  
  
  
  choosenSlot(day: any, indx: any){ //day is hard coded, index isnt
    this.isSelected = true; //If one is selected they cant select another
    this.timeIndex = indx; //keeping variable with selected index
    this.dayIndex = day;
    // day = Number(day) - 1;
    this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
    //console.log(this.currentlyHighlighted);
    var highlighted = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2))];
    
    if(indx > 34){
      if(indx == 35){
        document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
        document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
      }else{
        document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
      }
    }else{
      document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
      document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
      document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
    }
    
  }
  
  cancelSelection(){
    
    var highlighted = [("slot"+this.dayIndex+this.timeIndex), ("slot"+this.dayIndex+(this.timeIndex+1)), ("slot"+this.dayIndex+(this.timeIndex+2))];
    
    if(this.timeIndex > 34){
      if(this.timeIndex == 35){
        document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
      }else{
        document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
      }
    }else{
      document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
      document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
      document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
    }
    
    
    
    
    
    
    
    
    
    
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
  
  
  //this is the function ive made for submitting a selection
  saveAppointment(){
    this.apptService.AddAppointment(this.currentlyHighlighted, 'test69', 'test69').subscribe(data =>{
      console.log(data);
    });
  }
}
