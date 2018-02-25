import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NewClientService {

  constructor(private http: HttpClient) { }

  CreateClient(lastName: String, firstName: String, email: String, DOB: String, postalCode: String, phone: String, maritalStatus: String, healthCardNumber: String, occupation: String, others: String) {
    var url = "/api/patient"
    var body = {
      ID: 5,
      familyName: lastName,
      givenName: firstName,
      email: email,
      DOB: DOB,
      postalCode: postalCode,
      phone: phone,
      maritalStatus: maritalStatus,
      healthCardNumber: healthCardNumber,
      occupation: occupation,
      others: others
    }

    return this.http.post(url, body);
  }
}
