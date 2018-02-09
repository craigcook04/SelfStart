import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Object [];
  closeResult: string;

  constructor( private exerciseService: ExerciseService, 
               private modalService: NgbModal,
               private router: Router ) { }

  ngOnInit() {
    this.exerciseService.GetAllExercises().subscribe(data =>{
      // data comes back as exercisE (singular!!!!!)
      this.exercises = Object.assign([], data.exercise);
      console.log(this.exercises);
    })
  }

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media: string) {
    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, media)
    .subscribe(data =>{
      console.log(data);
    })
  }

  deleteExercise(id: string) {
    this.exerciseService.DeleteExercise(id).subscribe(data => {
      console.log(data);
    })
  }

}
