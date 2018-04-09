import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PhysioHomeService {

  constructor(private http: HttpClient) { }
    deleteDate: Date;
    
    GetPhysio(id: string) {
      return this.http.get('api/physiotherapist/' + id);
    }
    GetAppointments(today: string) {
      return this.http.get('api/appointment/day/' + today);
    }
    NormalAppt(userid: string) {
      return this.http.put('api/userAccount/appointments/normal/' + userid);
    }
    InitialAppt(userid: string) {
      return this.http.put('api/userAccount/appointments/initial/' + userid);
    }
    DeleteAppointment() {
      return this.http.delete('api/appointment/' + this.deleteDate);
    }
}
