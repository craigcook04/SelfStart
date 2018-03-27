import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { EncryptionService } from './encryption.service'
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserAccountsService {

  constructor(private http: HttpClient,
              private encryptionService: EncryptionService,
              private cookieService: CookieService) { }

  RequestResetPassword(username: string) {
    var url = "/api/useraccount/account/reset";
    var body = { username: username};

    return this.http.put(url, body);
  }

  GetUsersWantingAPasswordReset() {
    var url = '/api/useraccount/account/reset';

    return this.http.get(url);
  }

  Login(username: string, password: string, nonce: string, salt: string) {
    var url = "/api/useraccount/account/login";
    var hashPassword = this.encryptionService.hash(password);
    var hashWithSalt = hashPassword + salt;
    var hashedPassAndSalt = this.encryptionService.hash(hashWithSalt);
    var encryptedPassword = this.encryptionService.encrypt(hashedPassAndSalt);
    var encryptedNonce = this.encryptionService.encrypt(nonce);
    var body = {username: username, 
                encryptedpass: encryptedPassword,
                encryptednonce: encryptedNonce};

    return this.http.post(url, body);
  }

  InitialConnection(username: string) {
    var url = '/api/useraccount/account/initial';
    var body = {
      username: username,
      request: 'open'
    }

    return this.http.post(url, body);
  }

  GetAuthorization() {
    var url = '/api/useraccounts/session/loggedin';
    var sessionCookie = this.cookieService.get('session');
    var encryptedSessionCookie = this.encryptionService.encrypt(sessionCookie);    
    var body = {
      sessionToken: encryptedSessionCookie
    }

    return this.http.post(url, sessionCookie);
  }

  LoggedIn(){
    //All this route does it check if the user has a session token, if they do true is returned but if the cookie is null return false
    var sessionCookie = this.cookieService.get('session');
    console.log(sessionCookie);
    if(!sessionCookie) {
      return false;
    }

    return true;
  }

}
