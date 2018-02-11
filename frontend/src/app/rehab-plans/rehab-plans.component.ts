import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import {RehabPlansService} from '../rehab-plans.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-rehab-plans',
  templateUrl: './rehab-plans.component.html',
  styleUrls: ['./rehab-plans.component.css']
})
export class RehabPlansComponent implements OnInit {


  constructor(private rehabPlansService: RehabPlansService, 
  private modalService: NgbModal, 
  private exerciseService: ExerciseService,
  private router: Router) { }

  
  
  rehabPlans: Object[];
  exercise: Object[];
  allExercises: Object[];

  ngOnInit() {
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.rehabPlans = Object.assign([], data.rehabPlans)
    });
  }
  
  getExercises(ID: any){
    console.log(ID);
    this.exercise = Object.assign([], ID.exerciseObjects);
    
    // this.rehabPlansService.getExercises(ID).subscribe(data => {
    //   console.log(data);
    //   var retObj: any = data;
    //   this.exercise = Object.assign([], retObj.exercise);
    // });
    console.log(this.exercise);
  }
  
  searchPlans(){
  }
  open(content){
    this.modalService.open(content, {size: "lg"});
  }
  
  loadAllExercises(){
    this.exerciseService.GetAllExercises().subscribe(data =>{
      var retObj: any = data;
      console.log(data);
      this.allExercises = Object.assign([], retObj.exercise);
    });
  }
  updateExercises(){
    console.log(this.allExercises);
  }

  goBack(){
    this.router.navigate(['../adminhome']);
  }
  addExercise( exerciseToBeAdded: any, ID: string){
    console.log("in comp.");
    this.rehabPlansService.addExercise(ID, exerciseToBeAdded).subscribe(data => {
      var retObj: any = data;
      console.log(retObj);
    })
    window.location.reload();
  }
}
