import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-config';

const URL = '/api/image';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  providers: [NgbDatepickerConfig]
})
export class ExercisesComponent implements OnInit {

  obj: Object [];
  exercises: Object [];
  closeResult: string;
  

  public uploader:FileUploader = new FileUploader({url: URL});

  constructor( private exerciseService: ExerciseService, 
               private modalService: NgbModal,
               private router: Router,
               private imageService: ImageService,
               private dateConfig: NgbDatepickerConfig) { }

  ngOnInit() {
    this.exerciseService.GetAllExercises().subscribe(data =>{
      // data comes back as exercise (singular!!!!!)
      this.exercises = Object.assign([], data.exercise);
      console.log(this.exercises);
    })

    
  }

  @ViewChild('dp') dp: any;

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any) {
    //this.uploader.uploadAll;

    var fileNames = [String]; 
    for(var i =0; i < media.length; i++){
      fileNames[i] = media[i].file.name;
    }

    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, fileNames)
    .subscribe(data =>{
      //now link images to exercise
      this.imageService.sendExerciseID(id, fileNames).subscribe(data =>{
        console.log(data);
      })
      console.log(data);
      //window.location.reload();
    })
  }

  deleteExercise(id: string) {
    this.exerciseService.DeleteExercise(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }

  addExercise(exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any){

    
    this.exerciseService.AddExercise(exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, media)
    .subscribe(data =>{
      this.imageService.sendExerciseID(data._id, data.multimedia).subscribe(data =>{
        console.log("I happened");
      })
      console.log(data);
      window.location.reload();
    })
  }

  // getExerciseImages( exercise: string ){
  //   this.imageService.GetExerciseImage(exercise).subscribe(date =>{
  //     console.log(data);
  //   })
  // }

}

