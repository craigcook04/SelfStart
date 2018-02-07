import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Object [];

  constructor( private exerciseService: ExerciseService, 
               private modalService: NgbModal ) { }

  ngOnInit() {
    this.exerciseService.GetAllExercises().subscribe(data =>{
      this.exercises = Object.assign([], data.exercises);
      console.log(data);
    })
  }

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media: string, rehabPlans: any) {
    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, media, rehabPlans)
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
