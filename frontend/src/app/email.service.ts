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

  SendRecoveryEmail(username: string) {
    var url = "/api/email/forgotten";
    var body = {
      username: username
    }

    return this.http.post(url, body);
  }

  SendPDFToClient(pdf, toEmail, message) {
    var url = 'api/email/update/sendpdf';
    var body = {
      pdf: pdf,
      toEmail: toEmail,
      message: message
    }

    return this.http.post(url, body);
  }

}
