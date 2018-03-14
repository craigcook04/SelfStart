import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-client-exercise',
  templateUrl: './client-exercise.component.html',
  styleUrls: ['./client-exercise.component.css']
})
export class ClientExerciseComponent implements OnInit {

  exercises: Object [];
  currExercise: any;
  images: any [];
  exerciseImages: {
    firstTime: boolean,
    exerciseId: string,
    images: any
  } [];
  timeOfDay: string;
  
  constructor( private exerciseService: ExerciseService, 
               private router: Router,
               private imageService: ImageService,
               private iconRegistry: MatIconRegistry,
               private sanitizer: DomSanitizer,
               public dialog: MatDialog) {
                 iconRegistry.addSvgIcon(
                    'dumbbell',
                    sanitizer.bypassSecurityTrustResourceUrl('../assets/images/dumbbell.svg'));
                }

  ngOnInit() {
    this.timeOfDay = this.getTimeOfDay();
    this.exerciseService.GetAllExercises().subscribe(data =>{
      this.exercises = data.exercise;
      console.log(this.exercises);
      this.currExercise = this.exercises[0];
      console.log(this.currExercise);
      this.getExerciseImages(this.currExercise._id, this.currExercise.name);
    })
  }

  getTimeOfDay(): string{
    var now = new Date();
    var hour = now.getHours();
    if(hour < 13 && hour >= 0){ return "Morning"}
    if(hour < 17){ return "Afternoon"}
    else{ return "Evening"};
  }

  getExerciseInfo(exercise: any){
    this.currExercise = exercise;
    console.log(this.currExercise);
  }

  getExerciseImages(id: string, name:string){
    this.images = null;
    this.imageService.GetExerciseImage(id).subscribe(data=>{
      var obj: any = data;
      //this.exerciseImages.push({firstTime: false, exerciseId: id, images: obj.images})
      this.images = obj.images;

    })
  }
}
