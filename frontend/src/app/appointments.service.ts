import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppointmentsService {

  constructor(private httpClient: HttpClient) { }
  
  GetAllAppointments(){
      var url = '/api/appointment';
      return this.httpClient.get(url);
  }
  
  AddAppointment(date: any, reason: string, other: string): any{
      var body = {
          date: date,
          reason: reason,
          other: other
          // patient: patient
      }
      
      var url = '/api/appointment';
      return this.httpClient.post(url, body);
  }

}
