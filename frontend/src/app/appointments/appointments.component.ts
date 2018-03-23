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
  previouslyHighlighted: any[];
  isSelected: any;
  bookedDates: any[];
  timeIndex: any; 
  dayIndex: any;
  currentlyFilled: any[];
  currentlySaved: any[];
  isStart: any;
  temp: any[];
  toCancel: any;
  selectedWeek: any;
  isSaved: any;
  edgePage: any;
  formattedLiveDate: any;


  constructor(private modalService: NgbModal,
              private router: Router,
              private apptService: AppointmentsService) {}

  ngOnInit() {
    this.isSelected = false;
    this.currentlyFilled = new Array(37);
    this.cells = new Array(37); //Create 37 time slots
    this.temp = new Array(3);
    this.dateSelected = moment().startOf('week').format('LL') + " - " + moment().endOf('week').format('LL'); //set the range for the current week initially
    this.refreshCalendar(); //populate calendar
    this.isStart = true;
    this.toCancel = false;
    this.isSaved = false;
  }
  
  ngAfterViewInit(){
    // this.refreshCalendar();
    this.isSelected = false;
  }
  
  
  //this gets called when a time slot is clicked
  choosenSlot(day: any, indx: any){ //day is hard coded, index isnt
    var notTaken = true;
    
    
    //make sure they havnt selected more than one date
    if(!(this.isSelected)){
      //make sure the date they chose isnt already booked
      for(var i = 0; i<this.currentlyFilled.length; i++){
        if(this.currentlyFilled[i] == ("slot"+day+indx)){
          notTaken = false;
        }
      }
      
      
      //if booking is okay...
      if(notTaken){
        this.isSelected = true; //If one is selected they cant select another
        this.timeIndex = indx; //keeping variable with selected index
        this.dayIndex = day;
        // day = Number(day) - 1;
        this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        this.formattedLiveDate = moment(this.currentlyHighlighted).format("dddd, MMMM Do YYYY, h:mm a");
        //console.log(this.currentlyHighlighted);
        var highlighted = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2))];
        this.previouslyHighlighted = highlighted;
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2))];
        this.selectedWeek = this.currentWeek;
        
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
      }else{
        console.log("sorry, slot is already booked by another client");
      }
    }else{ //this will have to change the current selection to a new one
      console.log("sorry, slot is already chosen");
      //make sure the date they chose isnt already booked
      for(var i = 0; i<this.currentlyFilled.length; i++){
        if(this.currentlyFilled[i] == ("slot"+day+indx)){
          notTaken = false;
        }
      }
      
      //if booking is okay...
      if(notTaken){
        this.timeIndex = indx; //keeping variable with selected index
        this.dayIndex = day;
        // day = Number(day) - 1;
        this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        this.formattedLiveDate = moment(this.currentlyHighlighted).format("dddd, MMMM Do YYYY, h:mm a");
        //console.log(this.currentlyHighlighted);
        var highlighted = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2))];
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2))];
        this.selectedWeek = this.currentWeek;
        
        if(this.previouslyHighlighted[0] == "slot035" || this.previouslyHighlighted[0] == "slot135" || this.previouslyHighlighted[0] == "slot235" || this.previouslyHighlighted[0] == "slot335" ||this.previouslyHighlighted[0] == "slot435" ||this.previouslyHighlighted[0] ==  "slot535" ||this.previouslyHighlighted[0] == "slot635" || this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"){
          if(this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }else{
          document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
        }else{
        document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        }
        this.previouslyHighlighted = highlighted;
        
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
      }else{
        console.log("sorry, slot is already booked by another client");
      }
      
    }
  }
  
  
  //we ended up taking this feature out to simplify the user exp.
  cancelSelection(){
    
    if(this.isSelected){
      var highlighted = [("slot"+this.dayIndex+this.timeIndex), ("slot"+this.dayIndex+(this.timeIndex+1)), ("slot"+this.dayIndex+(this.timeIndex+2))];
      this.isSaved = false;
      this.isSelected = false;
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
    else{
      console.log("Cannot cancel without selecting");
    }
    
    //initialize new arrays for these to start fresh for next booking choice
    this.temp = new Array(3);
    this.currentlySaved = new Array(3);
  }
  
  refreshCalendar(){
    //populate with new dates
    this.apptService.GetAllAppointments().subscribe(data =>{
      var retObj: any = data; //Get all the appointements (like every one). -- will search by date here eventually
      this.bookedDates = Object.assign([], retObj.appointment); //assigns all appointements to bookedDates
      console.log(this.bookedDates); //at this point we have all booked dates
      
      //make all squares blue
      for(var i=0; i<7; i++){
        for(var j=0; j<37; j++){
          document.getElementById("slot"+i+j).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        }
      }
      
      //start looping through dates
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
          
          var takenSlot = [("slot" + dayNum + timeCount), ("slot" + dayNum + nextSlot), ("slot" + dayNum + secondSlot)]; //slot0{{i}}, slot1{{i}} ...etc
          this.currentlyFilled.push(takenSlot[0],takenSlot[1],takenSlot[2]);
          
          
          if(timeCount > 34){
            if(timeCount == 35){
              document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            }else{
              document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            }
          }else{
            document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
          }
          
          if(!(this.isStart) && (this.currentWeek == this.selectedWeek)){
            document.getElementById(this.currentlySaved[0]).setAttribute("class", "btn btn-sm sel chooseTime disabled");
            document.getElementById(this.currentlySaved[1]).setAttribute("class", "btn btn-sm sel chooseTime disabled");
            document.getElementById(this.currentlySaved[2]).setAttribute("class", "btn btn-sm sel chooseTime disabled");
          }
          
          if((this.isSelected) && (this.currentWeek == this.selectedWeek) && (this.isSaved == false)){
            document.getElementById(this.temp[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
            document.getElementById(this.temp[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
            document.getElementById(this.temp[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
          }
          
          console.log("Week: " + this.currentWeek);
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
  
  //we ended up taking this feature out to simplify the user exp.
  //this is the function ive made for submitting a selection
  saveAppointment(){
    if(this.isSelected){
      //keep the selected values to store in the database
      this.isSaved = true;
      this.currentlySaved = this.temp;
      this.isStart = false;
    }
    else{
      console.log("Cannot save without booking");
    }
  }
}
