import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { RehabPlansService } from '../rehab-plans.service';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.css']
})
export class AssignPlanComponent implements OnInit {

  rehabPlans: any [];
  clients: any [] = [
    {name: "Andy" },
    { name: "Sam" },
    { name: "Jeff" }
  ];
  exercises: any [];

  constructor( private rehabPlanService: RehabPlansService,
               private router: Router,
               private patientService: PatientService) { }

  ngOnInit() {
    this.rehabPlanService.getPlans().subscribe(data =>{
      this.rehabPlans = data.rehabPlans;
    })
    this.patientService.GetAllPatients().subscribe(data =>{
      console.log(data);
    })
  }


}
