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
    GetClientName(userid: string) {
      //return this.http.put('api/patient/getclient/' + userid);
    }
    DeleteAppointment(){
      return this.http.delete('api/appointment/' + this.deleteDate);
    }
}
