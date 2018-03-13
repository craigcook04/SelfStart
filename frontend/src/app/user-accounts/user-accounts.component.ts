import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { UserAccountsService } from '../user-accounts.service';
import {RehabPlansService} from '../rehab-plans.service';
import {PhysiotherapistService} from '../physiotherapist.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NewClientService } from '../new-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  constructor(private patientService: PatientService,
              private userAccountService: UserAccountsService,
              private rehabPlansService: RehabPlansService,
              private physiotherapistService: PhysiotherapistService,
              private modalService: NgbModal,
              private newClientService: NewClientService,
              private router: Router) { }
  
  clients: Object[];
  therapists: Object[];
  content: boolean;
  activated: any;
  genders: Object[];
  countries: Object[];
  provinces: Object[];
  cities: Object[];
  //genders: Object[];
  
  ngOnInit() {
    this.content = false;
    this.patientService.GetAllPatients().subscribe(data => {
      console.log(data);
      this.clients = Object.assign([], data.docs);
      console.log('hello');
      // console.log(this.patients);
    });
     this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
    });
  
    this.physiotherapistService.getTherapists().subscribe(data =>{
      var retObj: any = data;
      this.therapists = Object.assign([], data.physiotherapist);
    });
    this.patientService.GetCountries().subscribe(data => {
      var retObj: any = data;
      this.countries = Object.assign([], retObj.country);
    })

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
  showPhysio(therapist: any){
    // this.activated = null;
    if(this.activated == therapist){
      this.activated =null;
    }
    else{
      this.activated = therapist;
    }
    console.log(this.activated);
    
  }
    
  
   open(content) {
    this.modalService.open(content, {size: 'lg'});
  }
   updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string, newAddress: string) {
    
   //this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender, newAddress).subscribe(data => {
      console.log(data);
      //reload the list of patients
      this.patientService.GetAllPatients().subscribe(data => {
        this.clients = Object.assign([], data.docs);
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
  updatePhysio(givenName: string, familyName: string, email:string, ID: string, dateHired: string, dateFinished: string, _id: string){
    
    console.log("in component");
    this.physiotherapistService.updatePhysio(givenName, familyName, email, ID, dateHired, dateFinished, _id).subscribe (data =>{
      console.log(data);
      this.physiotherapistService.getTherapists().subscribe(data => {
        this.therapists = Object.assign([], data.physiotherapist);
      });  
      this.activated = null;
    });
  }
  viewClients(id: string){
    this.router.navigate(["../clients/"+id]);
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
        this.patientService.GetAllPatients().subscribe(data => {
          this.clients = Object.assign([], data.patients);
        });
      }
      else { 
       // this.showFailure = true;
      }
      
    });
  }
  NewPatient(firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string, newUserName: string, newPassword: string, newAddress: string) {
    //console.log(firstName, lastName, patientID, email, DOB,  postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender);
    this.newClientService.CreateClient(newUserName, newPassword, lastName, firstName, email, DOB, newGender, postalCode, phoneNumber, others, newCountry, newProvince, newCity, newAddress).subscribe(data => {
      var retObj: any = data;
      if(retObj.success) {
        //this.showCreationSuccess = true;
      }
      else{
       // this.showFailure = true;
      }

      //reload the new patient list
      this.patientService.GetAllPatients().subscribe(data => {
        this.clients = Object.assign([], data.docs);
        console.log(this.clients);
      });
    })
  }
  newPhysio(newPhysioFirstName: string, newPhysioLastName: string,  newPhysioEmail: string, newPhysioHired: string, newPhysioFinshed: string, newPhysioUserName: string, newPhysioPassword: string){
    this.physiotherapistService.createPhysio(newPhysioFirstName, newPhysioLastName, newPhysioEmail, newPhysioHired, newPhysioFinshed, newPhysioUserName, newPhysioPassword ).subscribe(data => {
      var retObj: any = data;
       //reload the new patient list
      this.physiotherapistService.getTherapists().subscribe(data => {
        this.therapists = Object.assign([], data.physiotherapist);
        console.log(this.therapists);
      });
    });
    
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
  deletePhysio1(id: any){
    console.log("in delete!")
    this.physiotherapistService.deletePhysioTherapist(id).subscribe(data =>{
      var retObj: any = data;
       this.physiotherapistService.getTherapists().subscribe(data => {
          this.therapists = Object.assign([], data.physiotherapist);
        });
      
      
    });
  }


}
