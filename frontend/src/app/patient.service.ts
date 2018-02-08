import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PatientService {

  constructor(private http: HttpClient) { }

  GetAllPatients() : any{
    var url = '/api/patient';
    return this.http.get(url);
  }

  UpdatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string) : any {
    //create the body of the request
    var body = {
      ID: patientID,
      familyName: lastName,
      givenName: firstName,
      email: email,
      DOB: DOB,
      postalCode: postalCode,
      phone: phoneNumber,
      maritalStatus: maritalStatus,
      healthCardNumber: healthCardNumber,
      occupation: occupation,
      others: others,
    }
    //url that the request is going to be sent too
    var url = '/api/patient/' + ID;
    return this.http.put(url, body);
  }

  DeletePatient(ID: string) {
    var url = '/api/patient/' + ID;
    return this.http.delete(url);
  }

  SearchPatient(searchString: string) {
    var url = '/api/patient/findpatient/search?q=' + searchString;
    return this.http.get(url);
  }

  GetCountries() {
    var url = '/api/country';
    return this.http.get(url);
  }

  GetProvinces() {
    var url = '/api/province';
    return this.http.get(url);
  }

  GetCities() {
    var url = '/api/city'
    return this.http.get(url);
  }

}
