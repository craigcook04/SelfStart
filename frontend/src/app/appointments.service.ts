import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';


@Injectable()
export class AppointmentsService {

  newType: any;
  newDate: Date;
  newPatient: any;
  newOther: any;
  newReason: any;
  currentPatientId: any; //set a method to set this equal to current user

  constructor(private httpClient: HttpClient) { }
  
  GetAllAppointments(){
      var url = '/api/appointment';
      return this.httpClient.get(url);
  }
  
  GetAppointmentsByWeek(week: any){
    var url = '/api/appointment/week/' + week;
    return this.httpClient.get(url);
  }
  
  
  AddAppointment(patient: any, reason: string, other: string): any{
    
      var body = {
          date: this.newDate,
          reason: reason,
          other: other,
          type: this.newType,
          patient: patient
          
          //This is where we have to link to images************
          // images: images
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
  
  setNewDate(date: Date){
    this.newDate = date;

    // moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }
  
  // getDate(){
  //   return this.newDate;
  // }

}
