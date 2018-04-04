import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../user-accounts.service';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showFailure: boolean;
  userIsDisabled: boolean;
  constructor(private userAccountsService: UserAccountsService,
              private router: Router,
              private cookieService: CookieService,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.showFailure = false;
  }

  Login(username: string, password: string) {

    if(!username || !password) {
      var cityBox = document.getElementById('inputPassword').style.borderColor = 'red';    
      this.showFailure = true;
      return;      
    }

    var cityBox = document.getElementById('inputPassword').style.borderColor = 'rgba(0,0,0,.15)';        
    this.userAccountsService.InitialConnection(username).subscribe(data => {
        var retObj1: any = data;
        if(retObj1.success == false) {
            this.showFailure = true;
            var cityBox = document.getElementById('inputPassword').style.borderColor = 'red';    
            return;
        }

        console.log("initialConnection", data);
        this.userAccountsService.Login(username, password, retObj1.nonce, retObj1.salt).subscribe(data => {
        var retObj: any = data;
        console.log("returned", data);
        if(retObj.success == true) {
          if(retObj.changePass == true) {
            var url = '../login/recover/' + retObj.userID;
            this.router.navigate([url]);
            this.appComponent.alterLoginState();
          }
          else {
            //expires in 1 hour, expires takes days so 1 hour is 1/24
            this.cookieService.set('ID', retObj.userID, 1/24);
            this.cookieService.set('session', retObj1.nonce, 1/24);
            this.cookieService.set('role', retObj.role, 1/24);

            if(retObj.role == "US") {
              this.router.navigate(['../client/home']);
              this.appComponent.alterLoginState();
              this.appComponent.toggleToClient();
            }

            else if (retObj.role == "AD") {
              this.router.navigate(['../admin/home']);
              this.appComponent.alterLoginState();
              this.appComponent.toggleToAdmin();
            }
            else {
              this.router.navigate(['../physio/home']);
              this.appComponent.alterLoginState();
              this.appComponent.toggleToPhysio();
            }
          }
        }
        else{ 

          if(retObj.incPass == true) {
            this.showFailure = true;
            var cityBox = document.getElementById('inputPassword').style.borderColor = 'red';                
          }
          if(retObj.isDisabled) {
            this.userIsDisabled = true;
            var cityBox = document.getElementById('inputPassword').style.borderColor = 'red';                            
          }
        }
      })
    })
    
  }

}
