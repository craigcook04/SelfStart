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

}
