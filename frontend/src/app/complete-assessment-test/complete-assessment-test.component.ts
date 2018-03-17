import { Component, OnInit } from '@angular/core';
import { AssessmentTestService } from '../assessment-test.service'
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complete-assessment-test',
  templateUrl: './complete-assessment-test.component.html',
  styleUrls: ['./complete-assessment-test.component.css'],
  providers: [NgbRatingConfig]
})
export class CompleteAssessmentTestComponent implements OnInit {

  assessmentTest: any;
  assessmentTestQuestions: any[];
  testLength: Number;
  MCAnswers: any[];

  constructor(private assessmentTestService: AssessmentTestService,
              private config: NgbRatingConfig) {
                this.config.max = 5;
               }

  ngOnInit() {
    this.assessmentTestService.GetPlans().subscribe(data => {
      var retObj: any = data;
      this.assessmentTest = retObj.assessmentTest[61];
      this.assessmentTestQuestions = this.assessmentTest.questions;
      this.testLength = this.assessmentTestQuestions.length;
    })

    this.MCAnswers = [];
  }

  RadioButtonClicked(content: string, i) {
    this.MCAnswers[i] = content;
  }

  SendBack(rating, i) {
    this.MCAnswers[i] = rating + 1;
  }

  SubmitAnswers() {
    for(var i = 0; i < this.testLength; i++) {
      var question = "question" + i;
      var element: any = document.getElementById(question);
      var questionCode = this.assessmentTestQuestions[i].questionCode;
      if(questionCode == "SA") {
        this.assessmentTestQuestions[i].answer = element.value;
      }
      if(questionCode == "MC") {
        this.assessmentTestQuestions[i].answer = this.MCAnswers[i];
      }
      if(questionCode == "RA") {
        this.assessmentTestQuestions[i].answer = this.MCAnswers[i];
      }
    }
      this.assessmentTestService.SendCompletedQuestions(this.assessmentTest._id, this.assessmentTestQuestions).subscribe(data=> {
        console.log(data);
      })
  }

}
