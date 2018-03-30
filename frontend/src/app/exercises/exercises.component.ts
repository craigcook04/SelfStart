import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../image.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { PageEvent } from '@angular/material';


const URL = '/api/image';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  obj: Object [];
  exercises: Object [];
  closeResult: string;
  images: any [];
  activated: any;
  invalidSearchArea: boolean;
  offset = 0;
  length = 0;
  pageSize = 10;
  pageSizeOptions = [10];
  pageEvent: PageEvent;
  noPause = true;


  @ViewChild('carousel') carousel:NgbCarousel;

  public uploader:FileUploader = new FileUploader({url: URL});

  constructor( private exerciseService: ExerciseService, 
               private modalService: NgbModal,
               private router: Router,
               private imageService: ImageService) { }

  ngOnInit() {
    this.exerciseService.GetAllExercises().subscribe(data =>{
      // data comes back as exercise (singular!!!!!)
      var obj : any = data;
      this.exercises = obj.docs;
      console.log(obj.total);
      this.length = data.total;
    })
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  SetOffset( searchValue: string, searchArea: string, event: PageEvent){
    this.offset = event.pageIndex;
    this.pageSize = event.pageSize;

    this.exerciseService.SearchExercises(searchValue, searchArea, this.offset * this.pageSize, this.pageSize).subscribe(data =>{
      if(data != []){
        var obj: any = data;
        this.exercises = obj.docs;
      }
    })
  }

  open(content) {
    this.modalService.open(content, {size: "lg"});
  }

  updateExercise(id: string, exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number) {

    console.log(this.uploader.queue);

    var fileNames = []; 
    for(var i = 0; i < this.uploader.queue.length; i++){
      console.log(this.uploader.queue[i].file.name);
      fileNames[i] = this.uploader.queue[i].file.name;
    }

    this.exerciseService.UpdateExercise(id, exName, descrip, objs, authName, actSteps, loc, freq, dur, fileNames)
    .subscribe(data =>{
      //now link images to exercise

      console.log(fileNames);
      if(this.uploader.queue.length > 0){
        fileNames.forEach(element => {
          console.log(element);
          this.imageService.sendExerciseID(data.exercise._id, element).subscribe(data =>{
          })
        })
      }
    })
  }

  deleteExercise(id: string) {
    this.exerciseService.DeleteExercise(id).subscribe(data => {
      
      this.exercises.forEach(element => {
        var obj: any = element;
        if(obj._id == id){
          var index = this.exercises.indexOf(element);

          this.exercises.splice(index, 1);
        }
      });
    })
  }

  addExercise(exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number){
    
    var fileNames = []; 
    for(var i = 0; i < this.uploader.queue.length; i++){
      fileNames[i] = this.uploader.queue[i].file.name;
    }
    
    this.exerciseService.AddExercise(exName, descrip, objs, authName, actSteps, loc, freq, dur, fileNames)
    .subscribe(data =>{

      if(this.uploader.queue.length > 0){
        fileNames.forEach(element => {
          this.imageService.sendExerciseID(data.exercise._id, element).subscribe(data =>{
          })
        })
      }
      //this.exercises.push(data.exercise);
    })
    this.exerciseService.SearchExercises("", "name", this.offset, this.pageSize).subscribe(data =>{
      if(data != []){
        var obj: any = data;
        console.log(obj.total);
        this.exercises = obj.docs;
        this.length = obj.total;
      }
    })
  }

  getExerciseImages( exercise: any ){
    this.imageService.GetExerciseImage(exercise).subscribe(data =>{
      var obj: any;
      obj = data;
      this.images = obj.images;
    })
  }

  deleteImage( image: any){
    this.imageService.deleteImage(image).subscribe(data =>{
      
      var index = this.images.indexOf(image);
      this.images.splice(image, 1);
    })
  }

  show(exercise: any){
    if(this.activated == exercise){
      this.activated = null;
    }
    else{
      this.activated = exercise;
    }
  }

  SearchExercises(searchString: string, searchArea: string){
    this.exerciseService.SearchExercises(searchString, searchArea, this.offset, this.pageSize).subscribe(data =>{
      if(data != []){
        var obj: any = data;
        this.exercises = obj.docs;
      }
    })
  }

}

