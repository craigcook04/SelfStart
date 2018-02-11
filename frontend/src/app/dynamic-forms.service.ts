import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DynamicFormsService {

  constructor(private http: HttpClient) { }
  
  //Get All forms
  GetAllForms() : any{
    var url = '/api/forms';
    return this.http.get(url);
  }
  
  //Create a form
  CreateNewForm(name: string, description: string) {
    //request body
    var body = {
      name: name,
      description: description
    }
    
    var url = '/api/forms';
    return this.http.post(url, body);
  }
  
  //Delete a form
  DeleteForm(id: string){
    var url = '/api/forms/' + id;
    return this.http.delete(url);
  }
  
  //Update a form
  UpdateForm(id: string, name: string, description: string){
    //id is the variable from mongo, newID is a self assigned id to track forms numerically
    var body = {
      name: name,
      description: description
    }
    
    var url = '/api/forms' + id;
    return this.http.put(url, body);
  }

}
