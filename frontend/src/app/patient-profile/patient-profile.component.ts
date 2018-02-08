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
  countries: Object[];
  constructor(private patientService: PatientService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.patientService.GetAllPatients().subscribe(data => {
      this.patients = Object.assign([], data.patients);
      console.log(data);
    });

    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

    this.patientService.GetProvinces().subscribe(data => {
      console.log(data);
    })

    this.patientService.GetCities().subscribe(data => {
      console.log(data);
    })

  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string) {
  
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others).subscribe(data => {
      console.log(data);
    })

  }

  deletePatient(ID: string) {
    
    this.patientService.DeletePatient(ID).subscribe(data => {
      console.log(data);
    })
  }

  searchPatients(searchString: string) {
    console.log(searchString);
    this.patientService.SearchPatient(searchString).subscribe(data => {
      if(data != []) {
        var retObj : any = data;
        this.patients = Object.assign([], retObj.patients);
      }
    })
  }

  

}
