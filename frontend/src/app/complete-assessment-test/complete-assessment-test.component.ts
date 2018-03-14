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
  constructor(private assessmentTestService: AssessmentTestService,
              private config: NgbRatingConfig) {
                this.config.max = 5;
               }

  ngOnInit() {
    this.assessmentTestService.GetPlans().subscribe(data => {
      var retObj: any = data;
      this.assessmentTest = retObj.assessmentTest[0];
      this.assessmentTestQuestions = this.assessmentTest.questions;
      this.testLength = this.assessmentTestQuestions.length;
      console.log(this.testLength);
      console.log(this.assessmentTest);
      console.log(this.assessmentTestQuestions);
    })
  }

  SubmitAnswers() {
    console.log(this.assessmentTest);
    console.log(this.assessmentTestQuestions);
    console.log(this.testLength);
    for(var i = 0; i < this.testLength; i++) {
      var question = "question" + i;
      var element: any = document.getElementById(question);
      var questionCode = this.assessmentTestQuestions[i].questionCode;
      if(questionCode == "SA") {
        this.assessmentTestQuestions[i].answer = element.value;
      }
      if(questionCode == "MC") {
        var numberOfMCs = this.assessmentTestQuestions[i].questionContent.length;
        for(var j = 0; j < numberOfMCs; j++) {
          var newQuestion = question + j;
          var radioButton : any = document.getElementById(newQuestion);
          console.log("---->",radioButton.class);
        }
        
      }
      console.log('element', element);
    }

    console.log("new list", this.assessmentTestQuestions);
  }

}
