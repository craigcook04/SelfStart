import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PhysioHomeService {

  constructor(private http: HttpClient) { }
    
    GetPhysio(id: string) {
      return this.http.get('api/physiotherapist/' + id);
    }
    GetAppointments(today: string) {
      return this.http.get('api/appointment/day/' + today);
    }
    UpdateAppointment(id: string){
      var body = {
        
      }
      return this.http.put('api/appointment/' + id, body);
    }
    DeleteAppointment(id: string){
      return this.http.delete('api/appointment/' + id);
    }
}
