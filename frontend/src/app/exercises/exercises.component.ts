import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-config';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';

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
  images: any [];
  maxSize: number = 1024;

  @ViewChild('carousel') carousel:NgbCarousel;
  @ViewChild('dp') dp: any;

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

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any) {

    var fileNames = [String]; 
    for(var i =0; i < media.length; i++){
      fileNames[i] = media[i].file.name;
    }

    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, fileNames)
    .subscribe(data =>{
      //now link images to exercise
      console.log(data.exercise._id);

      if(fileNames.length > 1){
        fileNames.forEach(element => {
          this.imageService.sendExerciseID(data.exercise._id, element).subscribe(data =>{
            console.log(data);
          })
        });
      }
      //window.location.reload();
    })
  }

  deleteExercise(id: string) {
    this.exerciseService.DeleteExercise(id).subscribe(data => {
      console.log(data);
      
      this.exercises.forEach(element => {
        var obj: any = element;
        if(obj._id == id){
          var index = this.exercises.indexOf(element);

          this.exercises.splice(index, 1);
        }
      });
    })
  }

  addExercise(exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media:any){
    this.exerciseService.AddExercise(exName, descrip, objs, authName, actSteps, loc, freq, dur, targDate, media)
    .subscribe(data =>{
      console.log(data);

      this.uploader.onCompleteAll = () => {

        if(media.length > 1){
          media.forEach(element => {
            this.imageService.sendExerciseID(data.exercise._id, element).subscribe(data =>{
              console.log(data);
            })
          });
        }
      }
      this.exercises.push(data.exercise);
      // window.location.reload();
    })
  }

  getExerciseImages( exercise: any ){
    console.log(exercise);
    this.imageService.GetExerciseImage(exercise).subscribe(data =>{
      console.log(data);
      var obj: any;
      obj = data;
      this.images = obj.images;
      console.log(this.images[0]);
    })
  }

  deleteImage( image: any){
    console.log(image);
    this.imageService.deleteImage(image).subscribe(data =>{
      
      var index = this.images.indexOf(image);
      this.images.splice(image, 1);

      console.log(data);
    })
  }

}

