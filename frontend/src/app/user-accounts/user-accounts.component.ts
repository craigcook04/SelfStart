import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { UserAccountsService } from '../user-accounts.service';
import {RehabPlansService} from '../rehab-plans.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  constructor(private patientService: PatientService,
              private userAccountService: UserAccountsService,
              private rehabPlansService: RehabPlansService) { }
  
  clients: Object[];
  therapists: Object[];
  content: boolean;
  activated: any;
  
  ngOnInit() {
    this.content = false;
    this.patientService.GetAllPatients().subscribe(data => {
      this.clients = Object.assign([], data.patients);
      console.log('hello');
      // console.log(this.patients);
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

}
