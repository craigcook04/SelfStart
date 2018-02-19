import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private exerciseService: ExerciseService) { };
  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  
  goToBookAppointment(){
    this.router.navigate(['../bookappointment']);
  }
  
  openInjuryForm(){
    alert('Open Injury Form');
  }

}
