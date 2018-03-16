import { Component, OnInit } from '@angular/core';
import { DynamicFormsService } from '../dynamic-forms.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.css']
})
export class DynamicFormsComponent implements OnInit {

  public isCollapsed = false;
  //questions: Object [];
  forms: Object [];
  types: Object [];
  showSuccess: boolean;
  showDeleteSuccess: boolean;
  showFailure: boolean;
  editMode: boolean;
  onForm: boolean;
  tempFID: string;
  tempQID: string;
  selectedType: string;
  openEditor: boolean;
  showDrop: boolean;
  type: string;
  shortAnswer: boolean = false;
  multipleChoice: boolean = false;
  rating: boolean = false;
  showCreat: boolean = true;
  options: any[];
  optionText: any[];
  questions: any[];
  name: string;
  description: string;
  currOption: string = 'c';

  constructor(private dynamicFormsService: DynamicFormsService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.dynamicFormsService.GetAllForms().subscribe(data =>{
      this.forms = Object.assign([], data.form);
      console.log(data);
    })
    
    this.editMode = false;
    this.getTypes();

    this.showDrop = false;
    this.type = "Type Of Question";
    this.options = [];
    this.optionText = [];
    this.questions = [];
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
    console.log(this.questions);
  }

  NumToChar(n) {
    var ch = String.fromCharCode(97 + n);
    return ch;
  }

  SaveDynamicForm(name: string, description: string) {
    console.log(name, description);
  }

  CancelNewForm() {
    this.openEditor = false;
    this.showDrop = false;
    this.rating = false;
    this.multipleChoice = false;
    this.shortAnswer =  false;
    this.type = "type of question";
    this.showCreat = true;
    this.optionText = [];
    this.options =[];
    this.questions = [];
  }
  
  switchMode(){
    if(this.editMode == true){
      this.editMode = false;
    }
    else{
      this.editMode = true;
    }
  }
  
  deleteForm(ID: string) {
    this.dynamicFormsService.DeleteForm(ID).subscribe(data => {
      console.log(data);
      //update the list to reflect deletion
      this.dynamicFormsService.GetAllForms().subscribe(data =>{
      this.forms = Object.assign([], data.form);
      console.log(data);
      })
      
    })
  }
  
  createNewForm(name: string, description: string){
    this.dynamicFormsService.CreateNewForm(name, description).subscribe(data => {
      console.log(data);
      
      //update the list to reflect new form
      this.dynamicFormsService.GetAllForms().subscribe(data =>{
      this.forms = Object.assign([], data.form);
      console.log(data);
      })
    })
  }
  
  open(content) {
    this.modalService.open(content, {size: 'lg'});
    //this.tempFID = formID;
  }
  
  createQuestion(questionText: string, helpDescription: string, order: Number, formID: string, qType: string){
    console.log(questionText, helpDescription, order, formID, qType);
    this.dynamicFormsService.CreateQuestion(questionText, helpDescription, order, formID, qType).subscribe(data => {
      console.log(data);
      
      this.dynamicFormsService.GetFormQuestions(formID).subscribe(data => {
        var retObj: any = data;
        this.questions = Object.assign([], retObj.question);
        console.log(data);
      })
      
    })
  }
  
  createType(name: string, questionID: string){
    this.dynamicFormsService.CreateType(name, questionID).subscribe(data => {
      console.log(data);
    })
  }
  
  getTypes(){
    this.dynamicFormsService.GetTypes().subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.types = Object.assign([], retObj.questionType);
    })
  }
  
  getTypeId(name: string){
    this.dynamicFormsService.GetTypeID(name).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.tempQID = retObj._id;
    })
  }
  
  
  updateQuestion(id: string, questionText: string, helpDescription: string, order: Number, formID: string, questionType: string){
    this.dynamicFormsService.UpdateQuestion(id, questionText, helpDescription, order, formID, questionType).subscribe(data => {
      console.log(data);
      this.getFormQuestions(formID);
    })
  }

  
  //This is working
  deleteQuestion(ID: string, formID: string){
    this.dynamicFormsService.DeleteQuestion(ID).subscribe(data => {
      console.log(data);
      
      // this.dynamicFormsService.GetFormQuestions(formID).subscribe(data => {
      //   var retObj: any = data;
      //   this.questions = Object.assign([], retObj.question);
      //   console.log(data);
      // })
      this.getFormQuestions(formID);
    })   
  }
  
  //This is working -- dont touch for now
  getFormQuestions(formID: string){
    this.dynamicFormsService.GetFormQuestions(formID).subscribe(data => {
      var retObj: any = data;
      this.questions = Object.assign([], retObj.question);
      console.log(data);
    })
  }
  
  
  
  
}
