import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NewClientService {

  constructor(private http: HttpClient) { }

  CreateClient(username: String, password: String, lastName: String, firstName: String, email: String, DOB: String, gender: string, postalCode: String, phone: String, maritalStatus: String, healthCardNumber: String, occupation: String, others: String, country: string, province: string, city: string) {
    var url = "/api/patient"
    var body = {
      username: username,
      password: password,
      ID: 5,
      familyName: lastName,
      givenName: firstName,
      email: email,
      DOB: DOB,
      gender: gender,
      postalCode: postalCode,
      phone: phone,
      maritalStatus: maritalStatus,
      healthCardNumber: healthCardNumber,
      occupation: occupation,
      others: others,
      country: country,
      province: province,
      city: city
    }

    return this.http.post(url, body);
  }

  SendToVerification(userID: String, email: String) {
    var url = "/api/temp";
    var body = {
      userID: userID,
      email: email
    }

    return this.http.post(url, body);
  }
}
