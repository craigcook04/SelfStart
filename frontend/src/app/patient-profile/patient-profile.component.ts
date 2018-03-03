import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../email.service'

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  closeResult: string;
  showSuccess: boolean;
  showCreationSuccess: boolean;
  showDeleteSuccess: boolean;
  showFailure: boolean;
  emailSuccess: boolean;
  patients: Object[];
  countries: Object[];
  provinces: Object[];
  cities: Object[];
  genders: Object[];
  constructor(private patientService: PatientService,
              private modalService: NgbModal,
              private emailService: EmailService) { }

  ngOnInit() {
    this.patientService.GetAllPatients().subscribe(data => {
      this.patients = Object.assign([], data.patients);
      console.log('hello');
      console.log(this.patients);
    });

    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

    this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
    })

 

  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string, acc) {
    
    this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender).subscribe(data => {
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

  deletePatient(ID: string, acc) {
    console.log(ID);
    this.patientService.DeletePatient(ID).subscribe(data => {
      var retObj: any = data;
      if(retObj.success){
        this.showDeleteSuccess = true;
        this.showSuccess = false;
        this.showFailure = false;
        this.showCreationSuccess = false;
        acc.activeIds = []; //close all accordian panels
        this.patientService.GetAllPatients().subscribe(data => {
          this.patients = Object.assign([], data.patients);
        });
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
<<<<<<<<< saved version
      
    })
  }

  searchPatients(searchString: string, searchArea: string) {
    if(searchArea == 'badvalue') {
      //user tried to search without choosing a field. Display an error
      this.invalidSearchArea = true;
      var searchAreaBox = document.getElementById('searchDropdown').style.borderColor = 'red';
      return;
    }
    this.patientService.SearchPatient(searchString, searchArea, this.offset).subscribe(data => {
      if(data != []) {
        var retObj : any = data;
        this.patients = Object.assign([], retObj.docs);
=========
        this.patients = Object.assign([], retObj.patients);
>>>>>>>>> local version
      }
    })
  }

  HideMessage() {
    //hide all messages, if there are any
    this.showSuccess = false;
    this.showFailure = false;
    this.showDeleteSuccess = false;
    this.showCreationSuccess = false;
    this.emailSuccess = false;
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

  NewPatient(firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string) {
    //console.log(firstName, lastName, patientID, email, DOB,  postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender);
    this.patientService.CreatePatient(firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender).subscribe(data => {
      var retObj: any = data;
      if(retObj.success) {
        this.showCreationSuccess = true;
      }
      else{
        this.showFailure = true;
      }

      //reload the new patient list
      this.patientService.GetAllPatients().subscribe(data => {
<<<<<<<<< saved version
  NewPatient(firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string) {
    //console.log(firstName, lastName, patientID, email, DOB,  postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender);
    this.patientService.CreatePatient(firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender).subscribe(data => {
      var retObj: any = data;
      if(retObj.success) {
        this.showCreationSuccess = true;
      }
      else{
        this.showFailure = true;
      }

      //reload the new patient list
      this.patientService.GetAllPatients().subscribe(data => {
        this.patients = Object.assign([], data.docs);
=========
        this.patients = Object.assign([], data.docs);
>>>>>>>>> local version
        console.log(this.patients);
      });
    })
  }

  FillBoxes() {
    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
      var countryID: any = this.countries[0];
      this.patientService.GetProvinces(countryID._id).subscribe(data => {
        var retObj: any = data;
        this.provinces = Object.assign([], retObj.province);
        console.log(data);
        this.GetCities(retObj.province[0]._id);
      })
    })

  }

  SendEmail(toEmail: String, emailSubject: String, emailBody: String) { 
    this.emailService.SendEmail(toEmail, emailSubject, emailBody).subscribe(data => {
        console.log(data);
        var retObj: any = data;
        if(retObj.success == true) {
          this.emailSuccess = true;
        }
        else {
          this.showFailure = false;
        }
    })

  SendEmail(toEmail: String, emailSubject: String, emailBody: String) { 
    this.emailService.SendEmail(toEmail, emailSubject, emailBody).subscribe(data => {
        console.log(data);
        var retObj: any = data;
        if(retObj.success == true) {
          this.emailSuccess = true;
        }
        else {
          this.showFailure = false;
        }
    })
  } 
  
  
  NextPage(searchString: string, searchArea: string) {
    this.offset += 10;
    this.searchPatients(searchString, searchArea);
  }

  PreviousPage(searchString: string, searchArea: string) {
    if(this.offset != 0) {
      this.offset -= 10;
    }
    this.searchPatients(searchString, searchArea);
  }

  RemoveError() {
    var searchAreaBox = document.getElementById('searchDropdown').style.borderColor = 'rgba(0,0,0,.15)';
    this.invalidSearchArea = false;
  }

}
