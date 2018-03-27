import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppointmentsService {

  newType: any;
  newDate: Date;
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
  }
  
  getType(){
    return this.newType;
  }
  
  setNewDate(date: Date){
    this.newDate = date;
  }
  
  // getDate(){
  //   return this.newDate;
  // }

}
