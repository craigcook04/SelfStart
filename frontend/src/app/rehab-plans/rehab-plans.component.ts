import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RehabPlansService} from '../rehab-plans.service'

@Component({
  selector: 'app-rehab-plans',
  templateUrl: './rehab-plans.component.html',
  styleUrls: ['./rehab-plans.component.css']
})
export class RehabPlansComponent implements OnInit {
  
  constructor(private router: Router, private rehabPlansService: RehabPlansService) { }
  rehabPlans: Object[];
  exercise: Object[];

  ngOnInit() {
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.rehabPlans = Object.assign([], data.rehabPlans)
    });
  }
  
  getExercises(ID: string){
    this.rehabPlansService.getExercises(ID).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.exercise = Object.assign([], retObj.exercise);
    });
    console.log(this.exercise);
  }
  
  searchPlans(){
  }

  goBack(){
    this.router.navigate(['../adminhome']);
  }
}
