import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PhysioHomeService {

  constructor(private http: HttpClient) { }
    
    getAppointments(/*today*/){
        return this.http.get('api/appointment'/*+ today*/);
    }
}
