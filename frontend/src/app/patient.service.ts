import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PatientService {

  constructor(private http: HttpClient) { }

  GetAllPatients() : any{
    var url = '/api/patient?s=familyName&sortorder=asc&offset=0';
    return this.http.get(url);
  }
  getPhysioPatients(id: string){
    var url = "/api/patient/physiotherapist/" + id;
    return this.http.get(url);
  }

  UpdatePatient(ID: string, firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string, newAddress: string) : any {
    //create the body of the request
    var body = {
      ID: patientID,
      familyName: lastName,
      givenName: firstName,
      email: email,
      DOB: DOB,
      gender: newGender,
      postalCode: postalCode,
      phone: phoneNumber,
      maritalStatus: maritalStatus,
      healthCardNumber: healthCardNumber,
      occupation: occupation,
      others: others,
      country: newCountry,
      province: newProvince,
      city: newCity,
      address: newAddress
    }
    //url that the request is going to be sent too
    var url = '/api/patient/' + ID;
    return this.http.put(url, body);
  }

  DeletePatient(ID: string) {
    var url = '/api/patient/' + ID;
    return this.http.delete(url);
  }

  SearchPatient(searchString: string, searchArea: string, offset, ascvsdesc) {
    var url = '/api/patient?q=' + searchString + '&s=' + searchArea + '&sortorder=' + ascvsdesc + '&offset=' + offset;
    return this.http.get(url);
  }

  GetCountries() {
    var url = '/api/country';
    return this.http.get(url);
  }

  GetProvinces(countryId: string) {
    var url = '/api/country/getprovinces/' + countryId;
    return this.http.get(url);
  }

  GetCities(provinceId: string) {
    var url = '/api/province/getcities/' + provinceId;
    return this.http.get(url);
  }

  GetGenders() {
    var url = '/api/gender';
    return this.http.get(url);
  }

  CreatePatient(firstName: string, lastName: string, patientID: string, email: string, DOB: string, postalCode: string, phoneNumber: string, maritalStatus: string, healthCardNumber: string, occupation: string, others: string, newCountry: string, newProvince: string, newCity: string, newGender: string) {
    var body = {
      ID: patientID,
      familyName: lastName,
      givenName: firstName,
      email: email,
      DOB: DOB,
      gender: newGender,
      postalCode: postalCode,
      phone: phoneNumber,
      maritalStatus: maritalStatus,
      healthCardNumber: healthCardNumber,
      occupation: occupation,
      others: others,
      country: newCountry,
      province: newProvince,
      city: newCity
    }

    var url = '/api/patient'
    return this.http.post(url, body);
  }

}
