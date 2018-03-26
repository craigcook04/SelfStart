import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { RehabPlansService } from '../rehab-plans.service';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private rehabPlanService: RehabPlansService,
               private router: Router,
               private patientService: PatientService) { }

  ngOnInit() {
    this.rehabPlanService.getPlans().subscribe(data =>{
      this.rehabPlans = data.rehabPlans;
      this.assignCurrentPlan(this.rehabPlans[0]);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  assignCurrentPlan(plan: any){
    this.currPlan = plan;
    this.patientService.GetPatientsUnderPlan(plan._id).subscribe(data =>{
      var obj: any = data;
      this.clients = obj.patients;
    })
    this.patientService.GetPatientsNotUnderPlan(this.currPlan._id).subscribe(data =>{
      console.log(data);
      this.clientList = [];
      var obj: any = data;
      obj.patients.forEach(element => {
        this.clientList.push(createClient(element));
      });
      this.dataSource = new MatTableDataSource(this.clientList);
    })
  }

  assignPatientPlan(patient: any, plan: any){
    var obj: any;
    console.log(patient, plan);
    this.patientService.AssignPlan(patient, plan).subscribe(data =>{
      console.log(data);
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