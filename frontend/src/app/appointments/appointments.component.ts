import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MomentModule} from 'angular2-moment/moment.module';
import * as moment from 'moment';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  
  cells: Object[];
  dateSelected: any;
  currentWeek = 0;
  currentlyHighlighted: any;
  public background_color="red";

  constructor(private modalService: NgbModal,
              private router: Router) { 
  }

  ngOnInit() {
    this.cells = new Array(37);
    this.dateSelected = moment().startOf('week').format('LL') + " - " + moment().endOf('week').format('LL');
  }
  
  choosenSlot(day: any, indx: any){
    var timeIndex = indx;
    day = Number(day) - 1;
    this.currentlyHighlighted = moment().startOf('week').startOf('day').add(this.currentWeek, 'weeks').add((day), 'days').add(8.5, 'hours').add((timeIndex*15), 'minutes');
    console.log(this.currentlyHighlighted);
    
    
  }
  
  nextWeek(){
    this.currentWeek = this.currentWeek + 1;
    this.dateSelected = moment().add(this.currentWeek, 'weeks').startOf('week').format('LL') + " - " + moment().add(this.currentWeek, 'weeks').endOf('week').format('LL');
  }
  
  prevWeek(){
    if((this.currentWeek) === 0){
      return;
    }else{
      this.currentWeek = this.currentWeek - 1;
      this.dateSelected = moment().add(this.currentWeek, 'weeks').startOf('week').format('LL') + " - " + moment().add(this.currentWeek, 'weeks').endOf('week').format('LL');
    }
  }
}
