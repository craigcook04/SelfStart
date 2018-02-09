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
  showDeleteSuccess: boolean;
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
    });

    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

    // this.patientService.GetProvinces().subscribe(data => {
    //   var retObj: any = data;
    //   this.provinces = Object.assign([], retObj.province);
    // })

    // this.patientService.GetCities().subscribe(data => {
    //   var retObj: any = data;
    //   this.cities = Object.assign([], retObj.city);
    // })

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
        this.showFailure = true;
      }
    })

  }

  deletePatient(ID: string) {
    this.patientService.DeletePatient(ID).subscribe(data => {
      var retObj: any;
      if(retObj.success){
        this.showDeleteSuccess = true;
      }
      else { 
        this.showFailure = true;
      }
      
    })
  }

  searchPatients(searchString: string) {
    this.patientService.SearchPatient(searchString).subscribe(data => {
      if(data != []) {
        var retObj : any = data;
        this.patients = Object.assign([], retObj.patients);
      }
    })
  }

  HideMessage() {
    //hide all messages, if there are any
    this.showSuccess = false;
    this.showFailure = false;
    this.showDeleteSuccess = false;
  }

  GetProvinces(countryId: string) {
    //retrieve all provinces within a certain country
    this.patientService.GetProvinces(countryId).subscribe(data => {
      var retObj: any = data;
      this.provinces = Object.assign([], retObj.province);
    })
  }

  GetCities(provinceId: string) {
    //retrieve all cities within a certain province
    this.patientService.GetCities(provinceId).subscribe(data => {
      var retObj: any = data;
      this.cities = Object.assign([], retObj.cities);
    })
  }

  SetProvinceBox(provinceBox, cityBox){
    // a new country has been selected so remove all entries from the province and city boxes 
    provinceBox.selectedIndex = -1;
    cityBox.selectedIndex = -1;
    while (provinceBox.options.length > 0) {                
      provinceBox.remove(0);
    } 
    while (cityBox.options.length > 0) {                
      cityBox.remove(0);
    } 
  }

  DifferentGetProvince(countryId: string) {
     //This gets the cities for the first province selected
     this.patientService.GetProvinces(countryId).subscribe(data => {
      var retObj: any = data;
      this.provinces = Object.assign([], retObj.province);
      console.log(data);
      this.GetCities(retObj.province[0]._id);
    })
  }

  ClearAndGetCities(provinceId: string, cityBox) {
    //clear the city box and repopulate it with cities within the selected province
    while (cityBox.options.length > 0) {                
      cityBox.remove(0);
    } 

    this.patientService.GetCities(provinceId).subscribe(data => {
      var retObj: any = data;
      this.cities = Object.assign([], retObj.cities);
    })
  }

  

}
