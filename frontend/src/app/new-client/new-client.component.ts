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

  createClient(username: String, password: String, repeatPassword: String, lastName: String, firstName: String, email: String, DOB: String, postalCode: String, phone: String, maritalStatus: String, healthCardNumber: String, occupation: String, others: String) {
    // THIS NEEDS TO BE FIXED TO ACCOUNT FOR USERNAME AND PASSWORD
    if(password != repeatPassword){
      //error in this case, handle it and let the user know they made a mistake
      return;
    }

    this.newClientService.CreateClient(username, password, firstName, lastName, email, DOB, postalCode, phone, maritalStatus, healthCardNumber, occupation, others).subscribe(data => {
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
