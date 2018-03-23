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
  currPlan: any;
  exercisesInCurrPlan: any =[];

  ngOnInit() {
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.rehabPlans = Object.assign([], data.rehabPlans);
      this.currPlan = this.rehabPlans[0];
     // exercisesInCurrPlan = this.currPlan.exerciseObjects;
    });
     this.exerciseService.GetAllExercises().subscribe(data =>{
      var retObj: any = data;
      console.log(data);
      this.allExercises = Object.assign([], retObj.exercise);
      
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
  
  searchPlans(word: string){
     this.rehabPlansService.SearchPlans(word).subscribe(data => {
      if(data != []) {
        var retObj : any = data;
        console.log(retObj);
        this.rehabPlans = Object.assign([], retObj.rehabPlans);
      }
    });
    window.location.reload();
  }
  
  createPlan(planName: string, descript: string, author: string, goalOfPlan: string, timeFrame: Date){
    var body = {
      name: planName,
      description: descript,
      authorName: author,
      goal: goalOfPlan,
      timeFrameToComplete: timeFrame
    };
    console.log("hello");
    console.log(body);
    this.rehabPlansService.CreatePlan(body).subscribe(data =>{
      console.log(data);
      //window.location.reload();
      
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.rehabPlans = Object.assign([], data.rehabPlans)
    });
    });
   
  }
  
  open(content){
    this.modalService.open(content, {size: "lg"});
  }
  
  plan(content){
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
  
  addExercise( exerciseToBeAdded: any){
    console.log("in comp.");
    console.log(exerciseToBeAdded);
    var flag = true;
    console.log(this.exercisesInCurrPlan);
    for (var i =0; i<this.exercisesInCurrPlan.length; i++){
      if(this.exercisesInCurrPlan[i]._id == exerciseToBeAdded._id){
        flag = false;
        console.log(flag);
      }
    }
    console.log(this.exercisesInCurrPlan.indexOf(exerciseToBeAdded));
    var ID = this.currPlan._id;
    if (flag == false){
      this.rehabPlansService.addExercise(ID, exerciseToBeAdded).subscribe(data => {
        var retObj: any = data;
        console.log(retObj);
      // window.location.reload();
        this.rehabPlansService.getPlans().subscribe(data => {
          console.log(data);
          this.rehabPlans = Object.assign([], data.rehabPlans)
        });
        this.exercisesInCurrPlan.push(exerciseToBeAdded);
    
      });
    }
    this.allExercises.splice(this.allExercises.indexOf(exerciseToBeAdded),1)
  }
  removePlan(ID: string){
    this.rehabPlansService.removePlan(ID).subscribe(data => {
      console.log(data);
      this.rehabPlansService.getPlans().subscribe(data => {
        console.log(data);
        this.rehabPlans = Object.assign([], data.rehabPlans)
      });
    
      //window.location.reload();
    });
    
    
  }
  editThePlan(plan: any, newName: string, newAuthorName: string, newGoalName: string, newTimeFrame: Date, newDescription: string){
    console.log("in the function");
    plan.name = newName;
    plan.authorName = newAuthorName;
    plan.goal = newGoalName;
    plan.description = newDescription;
    plan.timeFrameToComplete = newTimeFrame;
    this.rehabPlansService.updatePlan(plan).subscribe(data =>{
      console.log(data);
      //window.location.reload();
      this.rehabPlansService.getPlans().subscribe(data => {
        console.log(data);
        this.rehabPlans = Object.assign([], data.rehabPlans)
      });
    
      
    });
    
  }
  removeExercise(exer: any){
    console.log("in the component")
    console.log(this.currPlan.exerciseObjects.indexOf(exer));
    this.currPlan.exerciseObjects.splice(this.currPlan.exerciseObjects.indexOf(exer),1);
    console.log(this.currPlan.exerciseObjects);
    this.rehabPlansService.updatePlan(this.currPlan).subscribe(data =>{
      console.log(data)
      //window.location.reload();
      
      this.rehabPlansService.getPlans().subscribe(data => {
        console.log(data);
        this.rehabPlans = Object.assign([], data.rehabPlans)
      });
    });
    this.exercisesInCurrPlan = this.currPlan.exerciseObjects;
    this.allExercises.push(exer);
    
  }
  
  viewPlan(plan:any){
    this.currPlan = plan;
    
    
    this.exercisesInCurrPlan = this.currPlan.exerciseObjects;
    
    this.exerciseService.GetAllExercises().subscribe(data =>{
      var retObj: any = data;
      console.log(data);
      this.allExercises = Object.assign([], retObj.exercise);
    });
  
    
    
  } 
}
