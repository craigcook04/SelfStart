import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PhysiotherapistService {

  constructor(private http: HttpClient) { }
  
  
  getTherapists(): any{
      var url = 'api/physiotherapist';
      return this.http.get(url);
  }
  createPhysio(newPhysioFirstName: string, newPhysioLastName: string, newPhysioEmail: string, newPhysioHired: string, newPhysioFinished: string, newPhysioUserName: string, newPhysioPassword: string ): any{
      var url = "/api/physiotherapist";
      var body = {
          username: newPhysioUserName,
          password: newPhysioPassword,
          ID: 0,
          dateHired: newPhysioHired,
          dateFinished: newPhysioFinished,
          email: newPhysioEmail,
          givenName: newPhysioFirstName,
          familyName: newPhysioLastName
          
      }
      return this.http.post(url, body);
  }
  deletePhysioTherapist(ID: string){
       var url = '/api/physiotherapist/' + ID;
       return this.http.delete(url);
  }
  updatePhysio(givenName1: string, familyName1: string, email1: string, ID1: string, dateHired1: string, dateFinished1: string, _id1: string){
      //var string1 = therapist._id;
      //console.log(string1);
      var url = '/api/physiotherapist/' + _id1;
      console.log(url);
      var body = {
          ID: ID1,
          familyName: familyName1,
          givenName: givenName1,
          email: email1,
          dateHired: dateHired1,
          dateFinished: dateFinished1
      }
   
  
      return this.http.put(url, body);
  }
  getInfo(id: string){
      var url = 'api/physiotherapist/' + id;
      return this.http.get(url);
  }
}