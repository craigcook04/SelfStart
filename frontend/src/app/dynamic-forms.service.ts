import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DynamicFormsService {

  constructor(private http: HttpClient) { }
  
  createNewQuestion(formID: string, questionText: string, helpDescription: string, order: number, type: string){
    
    var body = {
      questionText: questionText,
      helpDescription: helpDescription,
      order: order,
      form: formID,
      questionType: type
    }
    var url = '/api/question'
    return this.http.post(url, body);
    
  }
  
  updateQuestion(){
    
  }
  
  deleteQuestion(){
    
  }

}
