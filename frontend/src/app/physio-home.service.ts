import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PhysioHomeService {

  constructor(private http: HttpClient) { }
    
    getAppointments(){
        return this.http.get('api/appointment');
    }
}
