import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { UserAccountsService } from '../user-accounts.service';
import {RehabPlansService} from '../rehab-plans.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  constructor(private patientService: PatientService,
              private userAccountService: UserAccountsService,
              private rehabPlansService: RehabPlansService,
              private modalService: NgbModal) { }
  
  clients: Object[];
  therapists: Object[];
  content: boolean;
  activated: any;
  genders: Object[];
  
  ngOnInit() {
    this.content = false;
    this.patientService.GetAllPatients().subscribe(data => {
      this.clients = Object.assign([], data.patients);
      console.log('hello');
      // console.log(this.patients);
    });
     this.patientService.GetGenders().subscribe(data => {
      var retObj: any = data;
      this.genders = Object.assign([], retObj.gender);
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
   updatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string) {
    
   //this.showSuccess = true;
    this.patientService.UpdatePatient(ID, firstName, lastName, patientID, email, DOB, postalCode, phoneNumber, maritalStatus, healthCardNumber, occupation, others, newCountry, newProvince, newCity, newGender).subscribe(data => {
      console.log(data);
      //reload the list of patients
      this.patientService.GetAllPatients().subscribe(data => {
        this.clients = Object.assign([], data.patients);
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
    })

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
      
    })
  }



}
