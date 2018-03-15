import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var jquery: any;
declare var $: any;


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
  currSteps: string [];

  @ViewChild('test') test: ElementRef;
  @ViewChild('test2') test2: ElementRef;
  
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
    var steps = exercise.actionSteps.split(/[0-9]+\./g);
    console.log(steps);
    this.currSteps = steps;
    this.currSteps.shift();
    console.log(this.currSteps);
  }

  getExerciseImages(id: string, name:string){
    this.images = null;
    this.imageService.GetExerciseImage(id).subscribe(data=>{
      var obj: any = data;
      //this.exerciseImages.push({firstTime: false, exerciseId: id, images: obj.images})
      this.images = obj.images;

    })
  }

  openPrint(exercise: any){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    }

    let content = this.test.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 180,
      'elementHandlers': specialElementHandlers
    });

    var pageHeight = doc.internal.pageSize.height;
    
    // Before adding new content
    var y = 500 // Height position of new content
    if (y >= pageHeight)
    {
      doc.addPage();
      y = 0 // Restart height position
    }

    var vert = 0;
    doc.text( 30, 30, "Images:");
    this.images.forEach(image => {
      var imgData = 'data:image/png;base64,' + image.data;
      if(vert == 0){
        vert = 40;
      }
      else{
        vert = 140;
      }
      doc.addImage(imgData, 'PNG', 30, vert, 100, 100);
    });

    doc.save(exercise.name + '.pdf');

  }

  // openCarousel(carouel: any){
  //   document.
  // }
}
