import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.css']
})
export class DynamicFormsComponent implements OnInit {
  
  showForm: boolean;
  

  constructor() { }

  ngOnInit() {
    this.showForm = false;
  }
  
  createNewQuestion(){
    
  }

}
