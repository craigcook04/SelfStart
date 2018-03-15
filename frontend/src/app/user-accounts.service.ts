import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserAccountsService {

  constructor(private http: HttpClient) { }

  RequestResetPassword(username: string) {
    var url = "/api/useraccount/account/reset";
    var body = { username: username};

    return this.http.put(url, body);
  }

  GetUsersWantingAPasswordReset() {
    var url = '/api/useraccount/account/reset';

    return this.http.get(url);
  }

  Login(username: string, password: string) {
    var url = "/api/useraccount/account/login";
    var body = {username: username, password: password};

    return this.http.post(url, body);
  }

}