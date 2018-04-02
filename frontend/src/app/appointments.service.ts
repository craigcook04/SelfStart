import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';


@Injectable()
export class AppointmentsService {

  newType: any;
  newDate: any;
  newPatient: any;
  newOther: any;
  newReason: any;

  constructor(private httpClient: HttpClient) { }
  
  GetAllAppointments(){
      var url = '/api/appointment';
      return this.httpClient.get(url);
  }
  
  AddAppointment(patient: any, reason: string, other: string): any{
    
      var body = {
          date: this.newDate,
          reason: reason,
          other: other,
          type: this.newType
          // patient: patient
      }
      
      var url = '/api/appointment';
      return this.httpClient.post(url, body);
  }
  
  setType(type: string){
    this.newType = type;
    //console.log(this.newType); - ALSO DEFINED HERE
  }
  
  getType(){
    //console.log(this.newType);
    return this.newType;
  }
  
  setNewDate(date: any){
    this.newDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }
  
  // getDate(){
  //   return this.newDate;
  // }

}
