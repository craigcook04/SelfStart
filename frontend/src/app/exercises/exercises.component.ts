import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';



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
               private router: Router) { }

  ngOnInit() {
    this.exerciseService.GetAllExercises().subscribe(data =>{
      // data comes back as exercise (singular!!!!!)
      this.exercises = Object.assign([], data.exercise);
      console.log(this.exercises);
    })
  }

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any) {
    console.log(media.item(0));
    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, this.uploadFiles( media))
    .subscribe(data =>{
      console.log(data);
    })
  }

  deleteExercise(id: string) {
    this.exerciseService.DeleteExercise(id).subscribe(data => {
      console.log(data);
    })
  }

  addExercise(exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any){
    
    this.exerciseService.AddExercise(exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, media)
    .subscribe(data =>{
      console.log(data);
    })
  }

  uploadFiles( uploadFile: any){
    console.log(uploadFile.files);

    var filereader = new FileReader();

    filereader.readAsDataURL(uploadFile.files[0]);

    var obj = filereader.result;

    console.log("Object:");
    console.log(obj.name);
  
    // this.exerciseService.uploadFile( uploadFile.files ).subscribe(data =>{
    //   console.log(data);
    // })
  }
}
