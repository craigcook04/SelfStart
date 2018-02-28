import { Component, OnInit } from '@angular/core';
import { NewClientService } from '../new-client.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})

export class NewClientComponent implements OnInit {

  countries: Object[];
  provinces: Object[];
  cities: Object[];
  genders: Object[];
  invalidUsername: boolean = false;
  invalidPassword: boolean = false;
  invalidFirstname: boolean = false;
  invalidLastname: boolean = false;
  invalidGender: boolean = false;
  invalidDOB: boolean = false;
  invalidPhoneNumber: boolean = false;
  invalidPostalCode: boolean = false;
  invalidCountry: boolean = false;
  constructor(private newClientService: NewClientService,
              private patientService: PatientService) { }
 

  ngOnInit() {

    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

    this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
    })
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

  DifferentGetProvince(countryId: string) {
    //This gets the cities for the first province selected
    this.patientService.GetProvinces(countryId).subscribe(data => {
     var retObj: any = data;
     this.provinces = Object.assign([], retObj.province);
     console.log(data);
     this.GetCities(retObj.province[0]._id);
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

  ResetErrorMessages() {
    //Reset all the error messages. Then new ones will be shown if some still exist
    var usernameBox = document.getElementById('inputUsername').style.borderColor = 'rgba(0,0,0,.15)';
    var passwordBox = document.getElementById('inputPassword').style.borderColor = 'rgba(0,0,0,.15)';
    var repeatPasswordBox = document.getElementById('inputRepeatPassword').style.borderColor = 'rgba(0,0,0,.15)';
    var firstnameBox = document.getElementById('inputFirstName').style.borderColor = 'rgba(0,0,0,.15)';  
    var lastnameBox = document.getElementById('inputLastName').style.borderColor = 'rgba(0,0,0,.15)';  
    var DOBBox = document.getElementById('inputDOB').style.borderColor = 'rgba(0,0,0,.15)';
    var postalCodeBox = document.getElementById('inputPostalCode').style.borderColor = 'rgba(0,0,0,.15)';
    var firstnameBox = document.getElementById('inputGender').style.borderColor = 'rgba(0,0,0,.15)';   
    var countryBox = document.getElementById('inputCountry').style.borderColor = 'rgba(0,0,0,.15)';    
    var provinceBox = document.getElementById('inputProvince').style.borderColor = 'rgba(0,0,0,.15)';    
    var cityBox = document.getElementById('inputCity').style.borderColor = 'rgba(0,0,0,.15)';  
    this.invalidUsername= false;
    this.invalidPassword= false;
    this.invalidFirstname= false;
    this.invalidLastname= false;
    this.invalidGender= false;
    this.invalidDOB= false;
    this.invalidPhoneNumber = false;
    this.invalidPostalCode = false;
    this.invalidCountry = false;  
    
  }

  createClient(username: string, password: String, repeatPassword: String, firstName: string, lastName: string, email: string, DOB: string, gender: string, postalCode: String, phone: string, maritalStatus: String, healthCardNumber: String, occupation: string, others: String, country: string, province: string, city: string) {
    this.ResetErrorMessages();
    var cannotContinue: boolean = false; //if there are any errors in the form this stops from sending the request from the server
    if(password != repeatPassword || !password || !repeatPassword){
      //error in this case, handle it and let the user know they made a mistake
      var passwordBox = document.getElementById('inputPassword').style.borderColor = 'red';
      var repeatPasswordBox = document.getElementById('inputRepeatPassword').style.borderColor = 'red';
      this.invalidPassword = true;
      cannotContinue = true;
    }

    var badFormat = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //regex statement to limit bad characters in a username
    var badFormatWithNumbers =  /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/ //regex format to confirm input of first name and last name
    var badFormatWithLetters = /[ !\s\t@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  
    if(badFormat.test(username) || !username) {
      //username contains an illegal character
      var usernameBox = document.getElementById('inputUsername').style.borderColor = 'red';
      this.invalidUsername = true;
      cannotContinue = true;
    }
    
    if(badFormatWithNumbers.test(firstName) || !firstName) {
      var firstnameBox = document.getElementById('inputFirstName').style.borderColor = 'red';    
      this.invalidFirstname = true;
      cannotContinue = true;
    }

    if(badFormatWithNumbers.test(lastName) || !lastName) {
      var firstnameBox = document.getElementById('inputLastName').style.borderColor = 'red';    
      this.invalidLastname = true;
      cannotContinue = true;
    }

    if(!DOB) {
      var DOBBox = document.getElementById('inputDOB').style.borderColor = 'red';
      this.invalidDOB = false;
      cannotContinue = true;
    }

    if(!postalCode) {
      var postalCodeBox = document.getElementById('inputPostalCode').style.borderColor = 'red';
      this.invalidPostalCode = true;
      cannotContinue = true;
    }

    
    // console.log(badPhoneNumber.test(phone));
    // if(badPhoneNumber.test(phone)){
    //   var phoneBox = document.getElementById('inputPhoneNumber').style.borderColor = 'red';
    //   this.invalidPhoneNumber = true;
    //   cannotContinue = true;
    // }
    // if(emailFormat.test(email)) {
    //   var emailBox = document.getElementById('inputEmail').style.borderColor = 'red';
    //   console.log('problem');
    // }

    //if gender is "badvalue" than a selection wasn't chosen
    if(gender == "badvalue") {
      var firstnameBox = document.getElementById('inputGender').style.borderColor = 'red';    
      this.invalidGender = true;
      cannotContinue = true;
    }

    //if country is "badvalue" than a selection wasn't chosen
    if(country == "badvalue") {
      var countryBox = document.getElementById('inputCountry').style.borderColor = 'red';    
      var provinceBox = document.getElementById('inputProvince').style.borderColor = 'red';    
      var cityBox = document.getElementById('inputCity').style.borderColor = 'red';    
      this.invalidCountry = true;
      cannotContinue = true;
    }

    //if this if statement is triggered, there are errors in the code
    if(cannotContinue) {
      return;
    }

    this.newClientService.CreateClient(username, password, firstName, lastName, email, DOB, gender, postalCode, phone, maritalStatus, healthCardNumber, occupation, others, country, province, city).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      if(retObj.success == true) {
        this.newClientService.SendToVerification(retObj.patient._id, email).subscribe(data => {
          console.log(data);
        })
      }
      else {
        //the user will be shown an error in the creation problem along the lines of there being a server problem.
      }
    })
  }

}
