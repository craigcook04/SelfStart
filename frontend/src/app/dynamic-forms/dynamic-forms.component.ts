import { Component, OnInit } from '@angular/core';
import { DynamicFormsService } from '../dynamic-forms.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.css']
})
export class DynamicFormsComponent implements OnInit {
  
  showForm: boolean;
  
  public isCollapsed = false;
  
  constructor(private dynamicFormsService: DynamicFormsService) { }

  ngOnInit() {
    this.showForm = false;
  }
  
  // createNewQuestion(questionText: string, helpDescription: string, order: number, ){
  //   this.dynamicFormsService.createNewQuestion().subscribe(data => {
  //     console.log(data);
      
      
  //   })
  // }
  
  // updateQuestion(){
  //   this.dynamicFormsService.updateQuestion().subscribe(data => {
  //     console.log(data);
      
  //   })
  // }
  
  // deleteQuestion(){
  //   this.dynamicFormsService.updateQuestion().subscribe(data => {
  //     console.log(data);
      
  //   })
  // }

}
