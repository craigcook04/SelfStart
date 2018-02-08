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
  showSuccess: boolean;
  showFailure: boolean;
  patients: Object[];
  countries: Object[];
  provinces: Object[];
  cities: Object[];
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
      var retObj: any = data;
      this.provinces = Object.assign([], retObj.province);
    })

    this.patientService.GetCities().subscribe(data => {
      var retObj: any = data;
      this.cities = Object.assign([], retObj.city);
    })

  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, acc) {
    acc.activeIds = []; //close all accordian panels
    this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity).subscribe(data => {
      console.log(data);
      //reload the list of patients
      this.patientService.GetAllPatients().subscribe(data => {
        this.patients = Object.assign([], data.patients);
        console.log(data);
      });

      if(data.success) {
        //the update was successful
        this.showSuccess = true;
      }
      else{
        //it was not successful
        this.showFailure = false;
      }
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

  HideMessage() {
    this.showSuccess = false;
    this.showFailure = false;
  }

  

}
