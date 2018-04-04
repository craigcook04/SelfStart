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
  total: any;
  pageIndex:any = 0;
  offset: number = 0;
  offset2: number = 0;
  pageInfo: string;
  length2;
  pageSize = 10;
  pageSizeOptions = [10];
  ngOnInit() {
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.total = data.total;
      console.log(this.total);
      this.rehabPlans = Object.assign([], data.docs);
      console.log(this.rehabPlans);
      this.currPlan = this.rehabPlans[0];
      this.exercisesInCurrPlan = this.currPlan.exerciseObjects;
    });
     this.exerciseService.GetAllExercises().subscribe(data =>{
      var retObj: any = data;
      this.length2 = retObj.total;
      console.log(data);
      this.allExercises = Object.assign([], retObj.docs);
      
    });
  }
  
  
  applyFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.rehabPlansService.SearchPlans(filterValue, 0).subscribe(data => {
      console.log(data);
      //this.total = (data.total);
      var retObj : any = data;
      this.total = retObj.total;
      
      this.offset = 0;
      this.rehabPlans = Object.assign([], retObj.docs);
    });
  }
  

  createPlan(planName: string, descript: string, author: string, goalOfPlan: string, year:string, month:string, day:string){
    var timeFrame = year + '/' + month + '/' + day;
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
        this.total = data.total;
        this.rehabPlans = Object.assign([], data.docs)
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
      this.allExercises = Object.assign([], retObj.docs);
    });
  }
  
  updateExercises(){
    console.log(this.allExercises);
  }

  goBack(){
    this.router.navigate(['../adminhome']);
  }
  
  addExercise( exerciseToBeAdded: any, searchString: any){
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
    if (flag != false){
      this.rehabPlansService.addExercise(ID, exerciseToBeAdded).subscribe(data => {
        var retObj: any = data;
        console.log(retObj);
        this.rehabPlansService.SearchPlans(searchString, this.offset).subscribe(data => {
          var retObj : any = data;
          this.rehabPlans = Object.assign([], retObj.docs);
      
        });
        this.exercisesInCurrPlan.push(exerciseToBeAdded);
    
      });
    }
    this.allExercises.splice(this.allExercises.indexOf(exerciseToBeAdded),1)
  }
  removePlan(searchString){
    var ID = this.currPlan._id;
    this.rehabPlansService.removePlan(ID).subscribe(data => {
      console.log(data);
     this.rehabPlansService.SearchPlans(searchString, this.offset).subscribe(data => {
          var retObj : any = data;
          this.total = retObj.total;
          this.rehabPlans = Object.assign([], retObj.docs);
          this.currPlan = this.rehabPlans[0];
      
      });
    
    });
    this.rehabPlansService.removeClientFromPlan(ID).subscribe(data => {
      console.log(data);
    });
    
    
  }
  editThePlan(plan: any, newName: string, newAuthorName: string, newGoalName: string, newDescription: string, searchString, year:string, month:string, day:string){
    console.log("in the function");
    plan.name = newName;
    plan.authorName = newAuthorName;
    plan.goal = newGoalName;
    plan.description = newDescription;
    var newTimeFrame = year + '/' + month + '/' + day;
    plan.timeFrameToComplete = newTimeFrame;
    this.rehabPlansService.updatePlan(plan).subscribe(data =>{
      console.log(data);
      //window.location.reload();
      this.rehabPlansService.SearchPlans(searchString, this.offset).subscribe(data => {
          var retObj : any = data;
          this.rehabPlans = Object.assign([], retObj.docs);
      
      });
    
      
    });
    
  }
  removeExercise(exer: any, searchString: any){
    console.log("in the component")
    console.log(this.currPlan.exerciseObjects.indexOf(exer));
    this.currPlan.exerciseObjects.splice(this.currPlan.exerciseObjects.indexOf(exer),1);
    console.log(this.currPlan.exerciseObjects);
    this.rehabPlansService.updatePlan(this.currPlan).subscribe(data =>{
      console.log(data)
      //window.location.reload();
      
      this.rehabPlansService.SearchPlans(searchString, this.offset).subscribe(data => {
        var retObj : any = data;
        this.rehabPlans = Object.assign([], retObj.docs);
      
      });
    });
    var flag = this.allExercises.indexOf(exer);
    this.exercisesInCurrPlan = this.currPlan.exerciseObjects;
    if (flag == -1){
      this.allExercises.push(exer);
    }
  }
  
  viewPlan(plan:any){
    this.currPlan = plan;
    
    
    this.exercisesInCurrPlan = this.currPlan.exerciseObjects;
    
    this.exerciseService.GetAllExercises().subscribe(data =>{
      var retObj: any = data;
      console.log(data);
      this.allExercises = Object.assign([], retObj.docs);
    });
  
    
    
  } 
  switchPage(event: any, searchString: any){
    console.log("teting123");
    console.log(event);
    if (this.pageIndex<event.pageIndex){
      this.offset+=10;
      this.pageIndex++;
    }
    else{
      this.offset-=10;
      this.pageIndex--;
    }
    this.rehabPlansService.SearchPlans(searchString,this.offset).subscribe(data => {
      var retObj : any = data;
      this.rehabPlans = Object.assign([], retObj.docs);
      
    });
  }
  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.tests.filter = filterValue;
    this.searchExecises(filterValue);
  }
  searchExecises(searchString: string){
    this.exerciseService.SearchExercises(searchString,"name", this.offset2, 10).subscribe(data =>{
      if(data != []) {
        var retObj:any = data;
        //retObj = retObj.docs;
        this.length2 = retObj.total;
        this.allExercises = retObj.docs;
        if(this.offset2 + 10 > this.length2) {
          this.pageInfo = `${this.offset2} - ${this.length2} of ${retObj.total}` 
        }
        else{
          this.pageInfo = `${this.offset2} - ${this.offset2 + 10} of ${retObj.total}`    
        }
        
      }
    })
  }
   SwitchPageEvent(pageEvent: any, searchString: string) {
    this.offset2 = pageEvent.pageIndex * pageEvent.pageSize;
    console.log('hello im switching');
    this.searchExecises(searchString);
  }
}
