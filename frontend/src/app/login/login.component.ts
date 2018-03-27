import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../user-accounts.service';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showFailure: boolean;
  constructor(private userAccountsService: UserAccountsService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.showFailure = false;
  }

  Login(username: string, password: string) {
    this.showFailure = false;
    this.userAccountsService.InitialConnection(username).subscribe(data => {
        var retObj1: any = data;
        console.log("initialConnection", data);
        this.userAccountsService.Login(username, password, retObj1.nonce, retObj1.salt).subscribe(data => {
        var retObj: any = data;
        console.log(data);
        if(retObj.success = true) {
          if(retObj.changePass == true) {
            var url = '../login/recover/' + retObj.userID;
            this.router.navigate([url]);
          }
          else {
            //expires in 1 hour, expires takes days so 1 hour is 1/24
            this.cookieService.set('ID', retObj.userID, 1/24);
            this.cookieService.set('session', retObj1.nonce);
            this.cookieService.set('role', retObj.role, 1/24);
            this.router.navigate(['../home'])
          }
        }
        else{ 
          if(retObj.incPass == true) {
            this.showFailure = true;
          }
        }
      })
    })
    
  }

}
