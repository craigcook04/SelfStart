import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { RehabPlansService } from '../rehab-plans.service';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.css']
})
export class AssignPlanComponent implements OnInit {

  rehabPlans: any [];
  currPlan: any;
  clients: any[];
  clientList: Client[] = [];
  exercises: any [];
  displayedColumns = ['name', 'plan', 'actions'];
  dataSource: MatTableDataSource<Client>;
  offset = 0;
  offset2 = 0;
  length = 0;
  length2 = 0;
  pageSize = 10;
  pageSize2 = 10;
  pageSizeOptions = [10];
  pageEvent: PageEvent;
  pageEvent2: PageEvent;

  constructor( private rehabPlanService: RehabPlansService,
               private router: Router,
               private patientService: PatientService) { }

  ngOnInit() {
    this.rehabPlanService.getPlans().subscribe(data =>{
      var obj: any = data;
      this.rehabPlans = obj.docs;
      this.length2 = obj.total;
      this.assignCurrentPlan(this.rehabPlans[0]);
    })
  }

  applyFilter(filterValue: string) {

    this.patientService.SearchPatientRehab(this.currPlan._id, filterValue, this.offset * this.pageSize, this.pageSize).subscribe(data =>{
      if(data != []){
        this.clientList = [];
        var obj: any = data;
        this.length = obj.total;
        obj.docs.forEach(element => {
          this.clientList.push(createClient(element));
        });
        this.dataSource = new MatTableDataSource(this.clientList);
      }
    })
  }

  applyFilter2(filterValue: string) {
    
        this.rehabPlanService.SearchPlans(filterValue, "name", "asc", this.offset * this.pageSize).subscribe(data =>{
          if(data != []){
            console.log(data);
            this.rehabPlans = [];
            var obj: any = data;
            this.length = obj.total;
            this.rehabPlans = obj.docs;
          }
        })
      }

  SetOffset( searchValue: string, event: PageEvent){
    this.offset = event.pageIndex;
    this.pageSize = event.pageSize;

    this.patientService.SearchPatientRehab(this.currPlan._id, searchValue, this.offset * this.pageSize, this.pageSize).subscribe(data =>{
      if(data != []){
        this.clientList = [];
        var obj: any = data;
        this.length = obj.total;
        obj.docs.forEach(element => {
          this.clientList.push(createClient(element));
        });
        this.dataSource = new MatTableDataSource(this.clientList);
      }
    })
  }

  SetOffset2( searchValue: string, event: PageEvent){
    this.offset2 = event.pageIndex;
    this.pageSize2 = event.pageSize;

    this.rehabPlanService.SearchPlans(searchValue, "name", "asc", this.offset * this.pageSize).subscribe(data =>{
      if(data != []){
        console.log(data);
        this.rehabPlans = [];
        var obj: any = data;
        this.length2 = obj.total;
        this.rehabPlans = obj.docs;
      }
    })
  }

  //assign which plan is to be displayed in the card and get its corresponding information
  assignCurrentPlan(plan: any){
    this.currPlan = plan;
    this.patientService.GetPatientsUnderPlan(plan._id).subscribe(data =>{
      this.clients = [];
      var obj: any = data;
      this.clients = obj.patients;
    })
    this.patientService.GetPatientsNotUnderPlan(this.currPlan._id).subscribe(data =>{
      this.clientList = [];
      var obj: any = data;
      obj.docs.forEach(element => {
        this.clientList.push(createClient(element));
      });
      this.length = this.clientList.length;
      this.dataSource = new MatTableDataSource(this.clientList);
    })
  }

  assignPatientPlan(patient: any, plan: any){
    var obj: any;
    console.log(patient, plan);
    this.patientService.AssignPlan(patient, plan).subscribe(data =>{
      obj = data;
      var index = this.clientList.indexOf(obj.patient._id);
      this.clientList.splice(index);
      this.dataSource = new MatTableDataSource(this.clientList);
      this.clients.push(obj.patient);
    })
  }

  removePatient(patient: any, plan: any){
    var index = this.clients.indexOf(plan);
    this.clients.splice(index);
    var obj: any;
    this.patientService.RemovePatient(patient._id).subscribe(data =>{
      obj = data;
      this.clientList.push(createClient(obj.patient));
      this.dataSource = new MatTableDataSource(this.clientList);
    })
  }

}

function createClient(client: any): Client{
  if(client.rehabPlan){
    return {
      id: client._id,
      name: client.familyName + ", " + client.givenName,
      plan: client.rehabPlan.name
    }
  }
  return {
    id: client._id,
    name: client.familyName + ", " + client.givenName,
    plan: client.rehabPlan
  }
}

export interface Client {
  id: string;
  name: string;
  plan: any;
}