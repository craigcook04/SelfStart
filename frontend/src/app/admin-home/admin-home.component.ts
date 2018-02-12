import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  
  }
  
  goToExercises(){
    this.router.navigate(['../exercise']);
  }
  
  gotToPatients(){
    this.router.navigate(['../client']);
  }
  
  goToDynamicForm(){
    this.router.navigate(['../manageforms']);
    
  }
  
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }
  
}

