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
  currentType: string;
  reHighlight: any[];

  //NOTE: 1.5 hours for initial assessmengt and 1 hour for regular appointment

  constructor(private modalService: NgbModal, 
              private router: Router,
              private apptService: AppointmentsService) {}

  ngOnInit() {
    //this.currentType = this.apptService.getType(); - TO EARLY TO GET?
    //console.log(this.currentType);
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
    this.currentType = this.apptService.getType();
    var notTaken = true;
    //console.log(this.currentType);
    
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
        this.isStart = false;
        this.isSelected = true; //If one is selected they cant select another
        this.timeIndex = indx; //keeping variable with selected index
        this.dayIndex = day;
        // day = Number(day) - 1;
        this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        this.apptService.setNewDate(this.currentlyHighlighted);
        this.formattedLiveDate = moment(this.currentlyHighlighted).format("dddd, MMMM Do YYYY, h:mm a");
        //console.log(this.currentlyHighlighted);
        var highlighted = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)), ("slot"+day+(indx+5))];
        this.previouslyHighlighted = highlighted;
        this.reHighlight = highlighted;
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)), ("slot"+day+(indx+5))];
        this.selectedWeek = this.currentWeek;
        
        if(this.currentType == "normal"){
          if(indx > 33){
            if(indx == 34){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }else if(this.currentType == 'initial'){
         if(indx > 31){
            if(indx == 32){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
             else if(indx == 33){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
            else if(indx == 34){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(highlighted[5]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }
      }
  }else{ //this will have to change the current selection to a new one
      console.log("Booking time has been changed");
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
        this.isStart = false;
        // day = Number(day) - 1;
        this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        this.formattedLiveDate = moment(this.currentlyHighlighted).format("dddd, MMMM Do YYYY, h:mm a");
        //console.log(this.currentlyHighlighted);
        var highlighted = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)),  ("slot"+day+(indx+5))];
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)),  ("slot"+day+(indx+5))];
        this.reHighlight = highlighted;
        this.selectedWeek = this.currentWeek;
        if(this.previouslyHighlighted[0] == "slot035" || this.previouslyHighlighted[0] == "slot135" || this.previouslyHighlighted[0] == "slot235" || this.previouslyHighlighted[0] == "slot335" ||this.previouslyHighlighted[0] == "slot435" ||this.previouslyHighlighted[0] ==  "slot535" ||this.previouslyHighlighted[0] == "slot635" 
        || this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"
        || this.previouslyHighlighted[0] == "slot032" || this.previouslyHighlighted[0] == "slot132" || this.previouslyHighlighted[0] == "slot232" || this.previouslyHighlighted[0] == "slot332" ||this.previouslyHighlighted[0] == "slot432" ||this.previouslyHighlighted[0] ==  "slot532" ||this.previouslyHighlighted[0] == "slot632"
        || this.previouslyHighlighted[0] == "slot033" || this.previouslyHighlighted[0] == "slot133" || this.previouslyHighlighted[0] == "slot233" || this.previouslyHighlighted[0] == "slot333" ||this.previouslyHighlighted[0] == "slot433" ||this.previouslyHighlighted[0] ==  "slot533" ||this.previouslyHighlighted[0] == "slot633"
        || this.previouslyHighlighted[0] == "slot034" || this.previouslyHighlighted[0] == "slot134" || this.previouslyHighlighted[0] == "slot234" || this.previouslyHighlighted[0] == "slot334" ||this.previouslyHighlighted[0] == "slot434" ||this.previouslyHighlighted[0] ==  "slot534" ||this.previouslyHighlighted[0] == "slot634"){
          
           if(this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
          else if(this.previouslyHighlighted[0] == "slot035" || this.previouslyHighlighted[0] == "slot135" || this.previouslyHighlighted[0] == "slot235" || this.previouslyHighlighted[0] == "slot335" ||this.previouslyHighlighted[0] == "slot435" ||this.previouslyHighlighted[0] ==  "slot535" ||this.previouslyHighlighted[0] == "slot635"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
          else if(this.previouslyHighlighted[0] == "slot034" || this.previouslyHighlighted[0] == "slot134" || this.previouslyHighlighted[0] == "slot234" || this.previouslyHighlighted[0] == "slot334" ||this.previouslyHighlighted[0] == "slot434" ||this.previouslyHighlighted[0] ==  "slot534" ||this.previouslyHighlighted[0] == "slot634"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
          else if(this.previouslyHighlighted[0] == "slot033" || this.previouslyHighlighted[0] == "slot133" || this.previouslyHighlighted[0] == "slot233" || this.previouslyHighlighted[0] == "slot333" ||this.previouslyHighlighted[0] == "slot433" ||this.previouslyHighlighted[0] ==  "slot533" ||this.previouslyHighlighted[0] == "slot633"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
          else if(this.previouslyHighlighted[0] == "slot032" || this.previouslyHighlighted[0] == "slot132" || this.previouslyHighlighted[0] == "slot232" || this.previouslyHighlighted[0] == "slot332" ||this.previouslyHighlighted[0] == "slot432" ||this.previouslyHighlighted[0] ==  "slot532" ||this.previouslyHighlighted[0] == "slot632"){
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[4]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
          }
          
          
        }else{
            document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[4]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
            document.getElementById(this.previouslyHighlighted[5]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
        }
        
        this.previouslyHighlighted = highlighted;
        
        if(this.currentType == "normal"){
          if(indx > 33){
            if(indx == 34){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }else if(indx == 35){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }else{
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }
          }else{
            document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
          }
        }else if(this.currentType == 'initial'){
         if(indx > 31){
            if(indx == 32){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[4]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
             }
             else if(indx == 33){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
             }
            else if(indx == 34){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }else if(indx == 35){
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }else{
              document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            }
          }else{
            document.getElementById(highlighted[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[4]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
            document.getElementById(highlighted[5]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
          }
        }
      }else{
        console.log("sorry, slot is already booked by another client");
      }
    }
  }
  
  
  // //we ended up taking this feature out to simplify the user exp.
  // cancelSelection(){
    
  //   if(this.isSelected){
  //     var highlighted = [("slot"+this.dayIndex+this.timeIndex), ("slot"+this.dayIndex+(this.timeIndex+1)), ("slot"+this.dayIndex+(this.timeIndex+2))("slot"+this.dayIndex+this.timeIndex+3), ("slot"+this.dayIndex+(this.timeIndex+4)), ("slot"+this.dayIndex+(this.timeIndex+5))];
  //     this.isSaved = false;
  //     this.isSelected = false;
      
  //     if(this.previouslyHighlighted[0] == "slot035" || this.previouslyHighlighted[0] == "slot135" || this.previouslyHighlighted[0] == "slot235" || this.previouslyHighlighted[0] == "slot335" ||this.previouslyHighlighted[0] == "slot435" ||this.previouslyHighlighted[0] ==  "slot535" ||this.previouslyHighlighted[0] == "slot635" 
  //       || this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"
  //       || this.previouslyHighlighted[0] == "slot032" || this.previouslyHighlighted[0] == "slot132" || this.previouslyHighlighted[0] == "slot232" || this.previouslyHighlighted[0] == "slot332" ||this.previouslyHighlighted[0] == "slot432" ||this.previouslyHighlighted[0] ==  "slot532" ||this.previouslyHighlighted[0] == "slot632"
  //       || this.previouslyHighlighted[0] == "slot033" || this.previouslyHighlighted[0] == "slot133" || this.previouslyHighlighted[0] == "slot233" || this.previouslyHighlighted[0] == "slot333" ||this.previouslyHighlighted[0] == "slot433" ||this.previouslyHighlighted[0] ==  "slot533" ||this.previouslyHighlighted[0] == "slot633"
  //       || this.previouslyHighlighted[0] == "slot034" || this.previouslyHighlighted[0] == "slot134" || this.previouslyHighlighted[0] == "slot234" || this.previouslyHighlighted[0] == "slot334" ||this.previouslyHighlighted[0] == "slot434" ||this.previouslyHighlighted[0] ==  "slot534" ||this.previouslyHighlighted[0] == "slot634"){
          
  //         if(this.previouslyHighlighted[0] == "slot036" || this.previouslyHighlighted[0] == "slot136" || this.previouslyHighlighted[0] == "slot236" || this.previouslyHighlighted[0] == "slot336" ||this.previouslyHighlighted[0] == "slot436" ||this.previouslyHighlighted[0] ==  "slot536" ||this.previouslyHighlighted[0] == "slot636"){
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //         }
  //         else if(this.previouslyHighlighted[0] == "slot035" || this.previouslyHighlighted[0] == "slot135" || this.previouslyHighlighted[0] == "slot235" || this.previouslyHighlighted[0] == "slot335" ||this.previouslyHighlighted[0] == "slot435" ||this.previouslyHighlighted[0] ==  "slot535" ||this.previouslyHighlighted[0] == "slot635"){
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //         }
  //         else if(this.previouslyHighlighted[0] == "slot034" || this.previouslyHighlighted[0] == "slot134" || this.previouslyHighlighted[0] == "slot234" || this.previouslyHighlighted[0] == "slot334" ||this.previouslyHighlighted[0] == "slot434" ||this.previouslyHighlighted[0] ==  "slot534" ||this.previouslyHighlighted[0] == "slot634"){
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //         }
  //         else if(this.previouslyHighlighted[0] == "slot033" || this.previouslyHighlighted[0] == "slot133" || this.previouslyHighlighted[0] == "slot233" || this.previouslyHighlighted[0] == "slot333" ||this.previouslyHighlighted[0] == "slot433" ||this.previouslyHighlighted[0] ==  "slot533" ||this.previouslyHighlighted[0] == "slot633"){
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //         }
  //         else if(this.previouslyHighlighted[0] == "slot032" || this.previouslyHighlighted[0] == "slot132" || this.previouslyHighlighted[0] == "slot232" || this.previouslyHighlighted[0] == "slot332" ||this.previouslyHighlighted[0] == "slot432" ||this.previouslyHighlighted[0] ==  "slot532" ||this.previouslyHighlighted[0] == "slot632"){
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[4]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //         }
          
          
  //       }else{
  //           document.getElementById(this.previouslyHighlighted[0]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[1]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[2]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[3]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[4]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //           document.getElementById(this.previouslyHighlighted[5]).setAttribute("class", "btn btn-sm bg-primary chooseTime");
  //       }
      
  //   }else{
  //     console.log("Cannot cancel without selecting");
  //   }
    
  //   //initialize new arrays for these to start fresh for next booking choice
  //   this.temp = new Array(6);
  //   this.currentlySaved = new Array(6);
  // }
  
  refreshCalendar(){
    //populate with new dates
    this.apptService.GetAllAppointments().subscribe(data =>{
      var retObj: any = data; //Get all the appointements (like every one). -- will search by date here eventually
      this.bookedDates = Object.assign([], retObj.appointment); //assigns all appointements to bookedDates
      console.log(this.bookedDates); //at this point we have all booked dates
      
      //make all squares blue
      for(var i=0; i<7; i++){
        for(var j=0; j<37; j++){
          document.getElementById("slot"+i+j).setAttribute("class", "btn btn-sm btn-primary chooseTime");
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
          var thirdSlot = 0;
          var forthSlot = 0;
          var fifthSlot = 0;
          var countUp = true;
          //figure out how many 15-minute intervals are needed to get to time
          //** the work day starts at 830
          
          while(true){
            if(moment().add(this.currentWeek, 'weeks').startOf('week').add(dayNum, 'days').startOf('day').add(8, 'hours').add((30 + (timeCount*15)), 'minutes').isBefore(currDate)){
              
              timeCount = timeCount + 1; //will give me slot number
              nextSlot = timeCount + 1;
              secondSlot = nextSlot + 1;
              thirdSlot = secondSlot + 1;
              forthSlot = thirdSlot + 1;
              fifthSlot = forthSlot + 1;
              
            }
            else{
              break;
            }
          }
          
          if(this.currentType == "normal"){
            var takenSlot = [("slot" + dayNum + timeCount), ("slot" + dayNum + nextSlot), ("slot" + dayNum + secondSlot), ("slot" + dayNum + thirdSlot)]; //slot0{{i}}, slot1{{i}} ...etc
            this.currentlyFilled.push(takenSlot[0],takenSlot[1],takenSlot[2], takenSlot[3]);
          }else{
            var takenSlot = [("slot" + dayNum + timeCount), ("slot" + dayNum + nextSlot), ("slot" + dayNum + secondSlot), ("slot" + dayNum + thirdSlot), ("slot" + dayNum + forthSlot), ("slot" + dayNum + fifthSlot)]; //slot0{{i}}, slot1{{i}} ...etc
            this.currentlyFilled.push(takenSlot[0],takenSlot[1],takenSlot[2], takenSlot[3],takenSlot[4], takenSlot[5]);
          }
          
          
          if(this.currentType == "normal"){
            if((timeCount) > 33){
              if((timeCount) == 34){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }else if((timeCount) == 35){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }else{
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }
            }else{
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[3]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            }
          }else if(this.currentType  == 'initial'){
           if((timeCount) > 31){
              if((timeCount) == 32){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[3]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[4]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
               }
               else if((timeCount) == 33){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[3]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
               }
              else if((timeCount) == 34){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }else if((timeCount) == 35){
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }else{
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
              }
            }else{
                document.getElementById(takenSlot[0]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[1]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[2]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[3]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[4]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
                document.getElementById(takenSlot[5]).setAttribute("class", "btn btn-sm taken chooseTime disabled");
            }
          }
          
          

          if(!(this.isStart) && (this.currentWeek == this.selectedWeek)){
            //this is for setting the currently selected
            if(this.currentType == "normal"){
              if((this.timeIndex) > 33){
                if((this.timeIndex) == 34){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }else if((this.timeIndex) == 35){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }else{
                document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }
              }else{
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              }
            }else if(this.currentType == 'initial'){
            if((this.timeIndex) > 31){
                if((this.timeIndex) == 32){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[4]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }
                else if((this.timeIndex) == 33){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }
                else if((this.timeIndex) == 34){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }else if((this.timeIndex) == 35){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }else{
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                }
              }else{
                document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                document.getElementById(this.reHighlight[4]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
                document.getElementById(this.reHighlight[5]).setAttribute("class", "btn btn-sm bg-warning chooseTime");
              }
            }
          }
          
          //this used to be used for the ave functionality that was removed and combined into one step
          // if((this.isSelected) && (this.currentWeek == this.selectedWeek) && (this.isSaved == false)){
          //   document.getElementById(this.temp[0]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
          //   document.getElementById(this.temp[1]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
          //   document.getElementById(this.temp[2]).setAttribute("class", "btn btn-sm bg-warning chooseTime disabled");
          // }
          
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
  // saveAppointment(){
  //   if(this.isSelected){
  //     //keep the selected values to store in the database
  //     this.isSaved = true;
  //     //this.currentlySaved = this.temp;
  //     this.isStart = false;
  //   }
  //   else{
  //     console.log("Cannot save without booking");
  //   }
  // }
}
