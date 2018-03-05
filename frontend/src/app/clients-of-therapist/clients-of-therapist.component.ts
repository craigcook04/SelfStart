import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NewClientService } from '../new-client.service';
import {PhysiotherapistService} from '../physiotherapist.service';


@Component({
  selector: 'app-clients-of-therapist',
  templateUrl: './clients-of-therapist.component.html',
  styleUrls: ['./clients-of-therapist.component.css']
})
export class ClientsOfTherapistComponent implements OnInit {

  constructor(private patientService: PatientService,
              private newClientService: NewClientService,
              private modalService: NgbModal,
              private router: Router,
              private location: Location, private physiotherapistService: PhysiotherapistService ) { }
  
  
  clients: Object[];
  activated: any;
  physioId: string;
  therapist: any = " ";
  genders: Object[];
  countries: Object[];
  provinces: Object[];
  cities: Object[];
  
  
  ngOnInit() {
    this.physioId=((this.location.path()).split("/",3))[2];
    console.log(this.physioId);
    this.physiotherapistService.getInfo(this.physioId).subscribe(data =>{
      var retObj: any = data;
      this.therapist = Object.assign([], retObj.physiotherapist);
    });
    
    this.patientService.getPhysioPatients(this.physioId).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.clients = Object.assign([], retObj.docs);
      console.log('hello');
      // console.log(this.patients);
    });

    this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
    });
    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    });
  }
   show(client: any){
    //this.content = !(this.content);
    if(this.activated == client){
      this.activated =null;
    }
    else{
      this.activated = client;
    }
    console.log(this.activated);
    
  }
  open(content) {
    this.modalService.open(content, {size: 'lg'});
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
    });
  }
  updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: any, newProvince: any, newCity: any, newGender: any) {
    
   //this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender).subscribe(data => {
      console.log(data);
      //reload the list of patients
      this.patientService.getPhysioPatients(this.physioId).subscribe(data => {
        var retObj: any = data;
        this.clients = Object.assign([], retObj.patient);
        console.log(data);
      });
      this.activated = null;
      if(data.success) {
        //the update was successful
        //this.showSuccess = true;
      }
      else{
        //it was not successfuls
        //this.showFailure = true;
      }
    });

  }
   deletePatient(ID: string) {
    console.log(ID);
    this.patientService.DeletePatient(ID).subscribe(data => {
      var retObj: any = data;
      if(retObj.success){
        // this.showDeleteSuccess = true;
        // this.showSuccess = false;
        // this.showFailure = false;
        // this.showCreationSuccess = false;
        this.activated = null;
        //acc.activeIds = []; //close all accordian panels
        this.patientService.getPhysioPatients(this.physioId).subscribe(data => {
          var retObj: any = data;
          this.clients = Object.assign([], retObj.patient);
          console.log(data);
        });
      }
      else { 
       // this.showFailure = true;
      }
      
    });

  }
}
