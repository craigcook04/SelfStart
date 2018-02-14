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

}
