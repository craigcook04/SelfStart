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
  //verified 
  currentWeek = 0; //starts at the current week and increments every time next button is clicked
  cells: Object[]; //an array for the 37 time slots
  timeIndex: any; //keeps the currently selected time
  dayIndex: any; //keeps the currently selected day of the week
  currentlyFilled: any[]; //array for all slot ids in use
  yellowStartDate: any; //keeps currently yellow slots - previously: currentlyHighlighted
  yellowFormattedDate: any; //yellow selected date - but formatted
  saveYellow: any[]; //save the selected yellow slot in a variable
  
  
  
  
  //unverified
  dateSelected: any;
  
  
  isSelected: any;
  bookedDates: any[];
  
  
  currentlySaved: any[];
  isStart: any;
  temp: any[];
  toCancel: any;
  selectedWeek: any;
  isSaved: any;
  edgePage: any;
  
  currentType: string;
  reHighlight: any[];

  //NOTE: 1.5 hours for initial assessmengt and 1 hour for regular appointment

  constructor(private modalService: NgbModal, 
              private router: Router,
              private apptService: AppointmentsService) {}

  ngOnInit() {
    //this.currentType = this.apptService.getType(); - TO EARLY TO GET?
    //console.log(this.currentType);
    this.isSelected = false; //this is for if we have to set previous yellow squres back to blue or not
    this.currentlyFilled = new Array(); //array for the possible slots that could be filled - holds booked slots on current page
    this.cells = new Array(37); //Create 37 time slots
    this.dateSelected = moment().startOf('week').format('LL') + " - " + moment().endOf('week').format('LL'); //set the range for the current week initially with the current week
    this.refreshCalendar(); //populate calendar
    
    
    
    this.temp = new Array(3); 
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
    this.currentType = this.apptService.getType(); //get the type from the service
    var notTaken = true; //start this at true and set to false in the for loop below if needed
    //console.log(this.currentType);
    
    //make sure they havnt selected more than one date
    if(!(this.isSelected)){
      //make sure the date they chose isnt already booked
      for(var i = 0; i<this.currentlyFilled.length; i++){
        if(this.currentlyFilled[i] == ("slot"+day+indx)){
          notTaken = false; //gets set if date is already booked
        }
      }
    
      //if booking is okay...
      if(notTaken){
        this.isSelected = true; //If one is selected they cant select another
        this.timeIndex = indx; //keeping variable with selected index
        this.dayIndex = day; //saving index to variable
        this.yellowStartDate = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks') //add values to get selected date
          .add(this.dayIndex, 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        this.apptService.setNewDate(moment(this.yellowStartDate).toDate());
        var yellow = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), 
          ("slot"+day+(indx+3)), ("slot"+day+(indx+4)), ("slot"+day+(indx+5))]; //always sets 6 slots as if its an initial appointment
        this.saveYellow = yellow;
        this.selectedWeek = this.currentWeek;
        
        if(this.currentType == "normal"){
          if(indx > 33){
            if(indx == 34){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }else if(this.currentType == 'initial'){
         if(indx > 31){
            if(indx == 32){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
             else if(indx == 33){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
            else if(indx == 34){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[5]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }
        
        this.isStart = false;
        this.reHighlight = yellow;
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)), ("slot"+day+(indx+5))];
      }
      
  }else{ //this will have to change the current selection to a new one
      console.log("Booking time must be changed");
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
        this.yellowStartDate = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((this.timeIndex*15), 'minutes');
        var yellow = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)),  ("slot"+day+(indx+5))];
        this.selectedWeek = this.currentWeek;
        
        
        
        
        this.isStart = false;
        this.temp = [("slot"+day+indx), ("slot"+day+(indx+1)), ("slot"+day+(indx+2)), ("slot"+day+(indx+3)), ("slot"+day+(indx+4)),  ("slot"+day+(indx+5))];
        this.reHighlight = yellow;
        
        if(this.saveYellow[0] == "slot035" || this.saveYellow[0] == "slot135" || this.saveYellow[0] == "slot235" || this.saveYellow[0] == "slot335" ||this.saveYellow[0] == "slot435" ||this.saveYellow[0] ==  "slot535" ||this.saveYellow[0] == "slot635" 
        || this.saveYellow[0] == "slot036" || this.saveYellow[0] == "slot136" || this.saveYellow[0] == "slot236" || this.saveYellow[0] == "slot336" ||this.saveYellow[0] == "slot436" ||this.saveYellow[0] ==  "slot536" ||this.saveYellow[0] == "slot636"
        || this.saveYellow[0] == "slot032" || this.saveYellow[0] == "slot132" || this.saveYellow[0] == "slot232" || this.saveYellow[0] == "slot332" ||this.saveYellow[0] == "slot432" ||this.saveYellow[0] ==  "slot532" ||this.saveYellow[0] == "slot632"
        || this.saveYellow[0] == "slot033" || this.saveYellow[0] == "slot133" || this.saveYellow[0] == "slot233" || this.saveYellow[0] == "slot333" ||this.saveYellow[0] == "slot433" ||this.saveYellow[0] ==  "slot533" ||this.saveYellow[0] == "slot633"
        || this.saveYellow[0] == "slot034" || this.saveYellow[0] == "slot134" || this.saveYellow[0] == "slot234" || this.saveYellow[0] == "slot334" ||this.saveYellow[0] == "slot434" ||this.saveYellow[0] ==  "slot534" ||this.saveYellow[0] == "slot634"){
          
           if(this.saveYellow[0] == "slot036" || this.saveYellow[0] == "slot136" || this.saveYellow[0] == "slot236" || this.saveYellow[0] == "slot336" ||this.saveYellow[0] == "slot436" ||this.saveYellow[0] ==  "slot536" ||this.saveYellow[0] == "slot636"){
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
          }
          else if(this.saveYellow[0] == "slot035" || this.saveYellow[0] == "slot135" || this.saveYellow[0] == "slot235" || this.saveYellow[0] == "slot335" ||this.saveYellow[0] == "slot435" ||this.saveYellow[0] ==  "slot535" ||this.saveYellow[0] == "slot635"){
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[1]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
          }
          else if(this.saveYellow[0] == "slot034" || this.saveYellow[0] == "slot134" || this.saveYellow[0] == "slot234" || this.saveYellow[0] == "slot334" ||this.saveYellow[0] == "slot434" ||this.saveYellow[0] ==  "slot534" ||this.saveYellow[0] == "slot634"){
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[1]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[2]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
          }
          else if(this.saveYellow[0] == "slot033" || this.saveYellow[0] == "slot133" || this.saveYellow[0] == "slot233" || this.saveYellow[0] == "slot333" ||this.saveYellow[0] == "slot433" ||this.saveYellow[0] ==  "slot533" ||this.saveYellow[0] == "slot633"){
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[1]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[2]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[3]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
          }
          else if(this.saveYellow[0] == "slot032" || this.saveYellow[0] == "slot132" || this.saveYellow[0] == "slot232" || this.saveYellow[0] == "slot332" ||this.saveYellow[0] == "slot432" ||this.saveYellow[0] ==  "slot532" ||this.saveYellow[0] == "slot632"){
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[1]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[2]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[3]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[4]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
          }
          
          
        }else{
            document.getElementById(this.saveYellow[0]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[1]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[2]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[3]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[4]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
            document.getElementById(this.saveYellow[5]).setAttribute("class", "btn btn-sm btn-primary chooseTime");
        }
        
        this.saveYellow = yellow;
        
        if(this.currentType == "normal"){
          if(indx > 33){
            if(indx == 34){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }else if(this.currentType == 'initial'){
         if(indx > 31){
            if(indx == 32){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
             else if(indx == 33){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
             }
            else if(indx == 34){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else if(indx == 35){
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }else{
              document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            }
          }else{
            document.getElementById(yellow[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
            document.getElementById(yellow[5]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
          }
        }
      }else{
        console.log("sorry, slot is already booked by another client (already grey)");
      }
    }
  }
  
  




//------------------------- GOOD TILL HERE -------------------------------------




  
  refreshCalendar(){
    //lets change this to use this.selected week so were not pulling all appointments every single call
    
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
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }else if((this.timeIndex) == 35){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }else{
                document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }
              }else{
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              }
            }else if(this.currentType == 'initial'){
            if((this.timeIndex) > 31){
                if((this.timeIndex) == 32){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }
                else if((this.timeIndex) == 33){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }
                else if((this.timeIndex) == 34){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }else if((this.timeIndex) == 35){
                  document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }else{
                  document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                }
              }else{
                document.getElementById(this.reHighlight[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                document.getElementById(this.reHighlight[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                document.getElementById(this.reHighlight[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                document.getElementById(this.reHighlight[3]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                document.getElementById(this.reHighlight[4]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
                document.getElementById(this.reHighlight[5]).setAttribute("class", "btn btn-sm btn-yellow chooseTime");
              }
            }
          }
          
          //this used to be used for the ave functionality that was removed and combined into one step
          // if((this.isSelected) && (this.currentWeek == this.selectedWeek) && (this.isSaved == false)){
          //   document.getElementById(this.temp[0]).setAttribute("class", "btn btn-sm btn-yellow chooseTime disabled");
          //   document.getElementById(this.temp[1]).setAttribute("class", "btn btn-sm btn-yellow chooseTime disabled");
          //   document.getElementById(this.temp[2]).setAttribute("class", "btn btn-sm btn-yellow chooseTime disabled");
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
