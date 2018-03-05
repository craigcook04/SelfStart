import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core/';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from '@angular/material/stepper';

const URL = "/api/image/bookappointment"
const now = new Date();

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});

  model: NgbDateStruct;
  invalidName: boolean = false;

  @ViewChild('dp') dp: NgbDatepicker;

  constructor(private modalService: NgbModal,
              private router: Router,
              private imageService: ImageService) { 
              }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  selectToday(){
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  determineAge(){
    console.log("HERE");
    var age = document.querySelector('dp').innerHTML;
    console.log(age);
  }

  sendInitialInfoSheet(makeChanges){

    var name: any = document.querySelector('inputName');
    name = name.value;

    //regex commands for input validation
    var badFormat = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //regex statement to limit bad characters in a username
    var badFormatWithNumbers =  /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/ //regex format to confirm input of first name and last name
    var badFormatWithLetters = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    var emailFormat =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var validPhoneNumber = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
    var cannotContinue: boolean = false; //if there are any errors in the form this stops from sending the request from the server

    if(badFormat.test(name) || !name){
      var nameBox = document.getElementById('inputName').style.borderColor = "red";
      this.invalidName = true;
      cannotContinue = true;
    }

    if(cannotContinue){
      this.modalService.open(makeChanges, {size: 'lg'});
      return;
    }
  }



}
