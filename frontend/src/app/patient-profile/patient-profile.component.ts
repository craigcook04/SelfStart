import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  closeResult: string;
  patients: Object[];
  constructor(private patientService: PatientService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.patientService.GetAllPatients().subscribe(data => {
      this.patients = Object.assign([], data.patients);
      console.log(data);
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  

}
