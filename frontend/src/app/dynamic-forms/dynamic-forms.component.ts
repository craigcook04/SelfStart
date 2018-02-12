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
  showSuccess: boolean;
  showDeleteSuccess: boolean;
  showFailure: boolean;

  
  constructor(private dynamicFormsService: DynamicFormsService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.dynamicFormsService.GetAllForms().subscribe(data =>{
      this.forms = Object.assign([], data.form);
      console.log(data);
    })
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
  }
  
  createQuestion(questionText: string, helpDescription: string, order: Number, formID: string, questionType: string){
    this.dynamicFormsService.CreateQuestion(questionText, helpDescription, order, formID, questionType).subscribe(data => {
      console.log(data);
      
    })
  }
  
  deleteQuestion(ID: string, formID: string){
    this.dynamicFormsService.DeleteQuestion(ID).subscribe(data => {
      console.log(data);
      
      this.dynamicFormsService.GetFormQuestions().subscribe(data => {
        this.questions = Object.assign([], data.question);
        console.log(data);
      })
    })    
  }
  
  
  
}
