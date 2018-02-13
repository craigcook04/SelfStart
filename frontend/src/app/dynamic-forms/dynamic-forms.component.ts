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
  questions: Object [];
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
