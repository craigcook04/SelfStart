import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('i am in');
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.exerciseService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log('hi');
      console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
