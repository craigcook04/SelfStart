import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

  SendEmail(toEmail: String, subject: String, content: String) {
    var url = "/api/email";
    var body = {
      email: toEmail,
      subject: subject,
      emailContent: content
    }

    return this.http.post(url, body);
  }
}
