import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../email.service'
import * as moment from 'moment';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  pageInfo: string;
  closeResult: string;
  offset: number = 0;
  showSuccess: boolean;
  showCreationSuccess: boolean;
  showDeleteSuccess: boolean;
  showFailure: boolean;
  emailSuccess: boolean;
  invalidSearchArea: boolean;
  invalidFirstname: boolean = false;
  invalidLastname: boolean = false;
  invalidDOB: boolean = false;
  invalidPhoneNumber: boolean = false;
  invalidPostalCode: boolean = false;
  invalidEmail: boolean = false;
  invalidGender: boolean = false;
  invalidCountry: boolean = false;
  invalidAddress: boolean = false;
  patients: Object[];
  countries: Object[];
  provinces: Object[];
  cities: Object[];
  genders: Object[];
  ascendingOrd: boolean = true;
  cannotContinue: boolean = false;
  totalPatients: number;

  // MatPaginator Inputs
  length;
  pageSize = 10;
  pageSizeOptions = [10];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private patientService: PatientService,
              private modalService: NgbModal,
              private emailService: EmailService) { }

  ngOnInit() {
    this.StandardPatientList();
    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

    this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
    })
   console.log('hi');
   
  }

  SwitchPageEvent(pageEvent: any, searchString: string, searchArea: string) {
    this.offset = pageEvent.pageIndex * pageEvent.pageSize;
    console.log('hello im switching');
    this.searchPatients(searchString, searchArea);
  }

  StandardPatientList() {
    var searchAreaBox = document.getElementById('searchDropdown').style.borderColor = 'rgba(0,0,0,.15)';
    this.invalidSearchArea = false;
    this.ascendingOrd = true;
    
    this.patientService.GetAllPatients().subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.patients = Object.assign([], data.docs);
      this.length = retObj.total;
      console.log(this.patients);
      this.totalPatients = retObj.total;
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  SetDate(DOB: string) {
    var textbox: any = document.getElementById('datepick');
    textbox.value = DOB;
    console.log(DOB);
  }
  ResetErrorMessages() {
    //Reset all the error messages. Then new ones will be shown if some still exist
    var firstnameBox = document.getElementById('inputFirstName').style.borderColor = 'rgba(0,0,0,.15)';  
    var lastnameBox = document.getElementById('inputLastName').style.borderColor = 'rgba(0,0,0,.15)';  
    var DOBBox = document.getElementById('inputDOB').style.borderColor = 'rgba(0,0,0,.15)';
    var postalCodeBox = document.getElementById('inputPostalCode').style.borderColor = 'rgba(0,0,0,.15)'; 
    var emailBox = document.getElementById('inputEmail').style.borderColor = 'rgba(0,0,0,.15)';
    var phoneBox = document.getElementById('inputPhoneNumber').style.borderColor = 'rgba(0,0,0,.15)';
    var newAddressBox = document.getElementById('inputAddress').style.borderColor = 'rgba(0,0,0,.15)';    
    this.invalidFirstname= false;
    this.invalidLastname= false;
    this.invalidGender= false;
    this.invalidDOB= false;
    this.invalidPhoneNumber = false;
    this.invalidPostalCode = false;
    this.invalidEmail = false;
  }

  updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string, newAddress: string) {
    var badFormat = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //regex statement to limit bad characters in a username
    var badFormatWithNumbers =  /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/ //regex format to confirm input of first name and last name
    var badFormatWithLetters = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    var emailFormat =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var validPhoneNumber = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
    this.cannotContinue = false;
    console.log(phoneNumber, newAddress)
    if(badFormatWithNumbers.test(firstName) || !firstName) {
      var firstnameBox = document.getElementById('inputFirstName').style.borderColor = 'red';    
      this.invalidFirstname = true;
      this.cannotContinue = true;
    }

    if(badFormatWithNumbers.test(lastName) || !lastName) {
      var firstnameBox = document.getElementById('inputLastName').style.borderColor = 'red';    
      this.invalidLastname = true;
      this.cannotContinue = true;
    }

    if(!DOB) {
      var DOBBox = document.getElementById('inputDOB').style.borderColor = 'red';
      this.invalidDOB = false;
      this.cannotContinue = true;
    }

    if(!newAddress) {
      var newAddressBox = document.getElementById('inputAddress').style.borderColor = 'red';
      console.log(newAddress);
      this.invalidAddress = true;
      this.cannotContinue = true;
    }

    if(!postalCode) {
      var postalCodeBox = document.getElementById('inputPostalCode').style.borderColor = 'red';
      this.invalidPostalCode = true;
      this.cannotContinue = true;
    }
    
    if(!validPhoneNumber.test(phoneNumber)){
      var phoneBox = document.getElementById('inputPhoneNumber').style.borderColor = 'red';
      this.invalidPhoneNumber = true;
      this.cannotContinue = true;
    }
    if(!emailFormat.test(email)) {
      var emailBox = document.getElementById('inputEmail').style.borderColor = 'red';
      this.invalidEmail = true;
      this.cannotContinue = true;
    }

    if(this.cannotContinue) {
      //user cannot continue until changes have been fixed
      return;
    }

    this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, others, newCountry, newProvince, newCity, newGender, newAddress).subscribe(data => {
      console.log(data);
      //reload the list of patients
      this.patientService.GetAllPatients().subscribe(data => {
        this.patients = Object.assign([], data.docs);
        this.length = data.total;
        console.log(data);
      });

      if(data.success) {
        //the update was successful
        this.showSuccess = true;
        var closebtn: any= document.getElementById('closeBtn');
        this.ResetErrorMessages();
        closebtn.click();
      }
      else{
        //it was not successful
        this.showFailure = true;
      }
    })

  }

  FormatPhone(phoneNumber) {
    var a: any = phoneNumber;
    if(phoneNumber.length == 11) {
      var newPhoneNumber = a[0] + '-' + a[1] + a[2] + a[3] + '-' + a[4] + a[5] + a[6] + '-' + a[7] + a[8] + a[9] + a[10];
      return newPhoneNumber;
    }
    if(phoneNumber.length == 10) {
      var newPhoneNumber = a[0] + a[1] + a[2] + '-' + a[3] + a[4] + a[5] + '-' + a[6] + a[7] + a[8] + a[9];
      return newPhoneNumber;
    }

    return phoneNumber;
  }

  deletePatient(ID: string) {
    console.log(ID);
    this.patientService.DeletePatient(ID).subscribe(data => {
      var retObj: any = data;
      if(retObj.success){
        
        this.patientService.GetAllPatients().subscribe(data => {
          this.patients = Object.assign([], data.docs);
          this.showDeleteSuccess = true;
          this.showSuccess = false;
          this.showFailure = false;
          this.showCreationSuccess = false;
        });
      }
      else { 
        this.showFailure = true;
      }
      
    })
  }

  searchPatients(searchString: string, searchArea: string) {
    var ascvsdesc;
    if(this.ascendingOrd == true) {
      ascvsdesc = 'asc';
    }
    else {
      ascvsdesc = 'desc';
    }
    this.patientService.SearchPatient(searchString, searchArea, this.offset, ascvsdesc).subscribe(data => {
      if(data != []) {
        console.log(data);
        var retObj : any = data;
        this.patients = Object.assign([], retObj.docs);
        this.length = retObj.total;
        if(this.offset + 10 > this.totalPatients) {
          this.pageInfo = `${this.offset} - ${this.totalPatients} of ${retObj.total}` 
        }
        else{
          this.pageInfo = `${this.offset} - ${this.offset + 10} of ${retObj.total}`    
        }
        
      }
    })
  }

  HideMessage() {
    //hide all messages, if there are any
    console.log('hide messages');
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
        this.patients = Object.assign([], data.docs);
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
  } 
  
  
  NextPage(searchString: string, searchArea: string, ascvsdesc) {
    if(this.offset + 10 > this.totalPatients) {
      return;
    }
    this.offset += 10;
    this.searchPatients(searchString, searchArea);
  }

  PreviousPage(searchString: string, searchArea: string, ascvsdesc) {
    if(this.offset != 0) {
      this.offset -= 10;
    }
    this.searchPatients(searchString, searchArea);
  }

  RemoveError() {
    var searchAreaBox = document.getElementById('searchDropdown').style.borderColor = 'rgba(0,0,0,.15)';
    this.invalidSearchArea = false;
  }

  ChangeOrder() {
    this.ascendingOrd = !this.ascendingOrd;
  }

  calculateAge(DOB: string) {
    var years = moment().diff(DOB, 'years');
    return years;
  }

  closeWarning() {
    this.cannotContinue = false;
  }

  CopyToClipboard(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}