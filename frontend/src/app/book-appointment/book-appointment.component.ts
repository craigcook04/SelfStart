import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core/';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

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



}
