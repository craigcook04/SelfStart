import { Component, OnInit } from '@angular/core';
import {AssessmentTestService} from '../assessment-test.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-assessment-test',
  templateUrl: './assessment-test.component.html',
  styleUrls: ['./assessment-test.component.css']
})
export class AssessmentTestComponent implements OnInit {
  showDrop: boolean; 
  type: string;
  shortAnswer: boolean = false;
  multipleChoice: boolean = false;
  rating: boolean = false;
  showPatients: boolean = false;
  showCreat: boolean = true;
  options: any[];
  optionText: any[];
  questions: any[];
  name: string;
  description: string;
  clients: any[];
 
  
  
  // var currOption = 'c';
  currOption: string = 'c';

  constructor(private assessmentTestService: AssessmentTestService,  private modalService: NgbModal,
              private patientService: PatientService) { }

  ngOnInit() {
    this.showDrop = false;
    this.type = "Type Of Question";
    this.options = [];
    this.optionText = [];
    this.questions = [];
    this.clients = [];
 
    // this.questions.push(question);
  }
  enable(){
    this.showCreat = false;
  }
  enableAddQuestion(){
    
    this.showDrop = true;
  }
  changeSA(){
    this.type = "Short Answer";
    this.shortAnswer =true;
    this.multipleChoice = false;
    this.rating = false;
  }
  changeMC(){
    this.type = "Multiple Choice";
    this.shortAnswer =false;
    this.multipleChoice = true;
    this.rating = false;
  }
  changeRA(){
    this.type = "Rating";
    this.shortAnswer =false;
    this.multipleChoice = false;
    this.rating = true;
  }
  addOption(){
     console.log(this.currOption);
     if (this.options.length<=8){
      this.options.push(this.currOption);
      this.currOption = String.fromCharCode(this.currOption.charCodeAt(0) + 1);
     }
    
  }
  saveMCQuestion(){
    var temp: any = document.getElementById('inputOption');
    temp = temp.value;
    this.optionText.push(temp);
    var temp2: any = document.getElementById('inputOption2');
    temp2 = temp2.value;
    this.optionText.push(temp2);
    for (var i = 0; i<this.options.length; i++){
      var temp: any = document.getElementById(this.options[i]);
      temp = temp.value;
      this.optionText.push(temp);
      
    }
    var temp3: any = document.getElementById('inputMCQuestion');
    temp3 = temp3.value;
    var question = {
      questionText: temp3,
      questionCode: "MC",
      questionContent: this.optionText,
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.multipleChoice = false;
    this.type = "type of question";
    
    console.log(this.optionText);
    console.log(this.questions);
  }
  saveSAQuestion(){
    var temp: any = document.getElementById('inputShortAnswerQuestion');
    temp = temp.value;
    var question = {
      questionText: temp,
      questionCode: "SA",
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.shortAnswer = false;
    this.type = "type of question";
  }
  saveRatingQuestion(){
    var temp: any = document.getElementById('inputRatingQuestion');
    temp = temp.value;
    var question = {
      questionText: temp,
      questionCode: "RA",
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.rating = false;
    this.type = "type of question";
  }
  
  createTest(){
    var temp:any = document.getElementById('name');
    temp = temp.value;
    this.name = temp;
    
    var temp2:any = document.getElementById('description');
    temp2 = temp2.value;
    this.description = temp2;
    
    
    this.assessmentTestService.createPlan(this.name, this.description, this.questions).subscribe(data => {
      console.log(data);
    });
    this.showDrop = false;
    this.rating = false;
    this.multipleChoice = false;
    this.showPatients = false;
    this.type = "type of question";
    this.showCreat = true;
    this.optionText = [];
    this.options =[];
    this.questions = [];
    
  }
  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }
  openListOfPatients(){
  
   this.showCreat =true;
   this.showDrop = false;
   this.rating = false;
   this.multipleChoice = false;
   this.type = "type of question";
    //this.showCreat = true;
  // this.optionText = [];
  // this.options =[];
  // this.questions = [];
   this.patientService.GetAllPatients().subscribe(data => {
      console.log(data);
      this.clients = Object.assign([], data.docs);
      console.log('hello');
      // console.log(this.patients);
      console.log(this.clients);
    });
   
    this.showPatients = true;
    
  }
  assignTest(listOfClients: any[]){
    console.log(listOfClients);
    var clientIds: string[] = [];
    
    for (var i = 0; i<listOfClients.length; i++){
      clientIds.push(listOfClients[i].value);
    }
    for (var i = 0; i<clientIds.length; i++){
      this.assessmentTestService.createPlanwithAssignedTest(this.name, this.description, this.questions,clientIds[i]).subscribe(data => {
        console.log(data);
      });
    }
    this.showCreat = true;
    this.optionText = [];
    this.options =[];
    this.questions = [];
    this.showPatients = false;
    console.log(clientIds);
  }
}
