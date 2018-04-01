import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAccountsService } from './user-accounts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLogin: boolean;

  constructor(private router: Router,
              private cookieService: CookieService,
              private userAccountsService: UserAccountsService) 
              {
                if(this.cookieService.get('session')) {
                  //there is a current session going on so the logout button should be displayed
                  this.showLogin = false;
                }
                else {
                  this.showLogin = true;
                }
              }
  
  goHome(){
    this.router.navigate(['home']);
  }

  alterLoginState() {
    this.showLogin = false;
  }

  logout() {
    this.showLogin = true;
    var session = this.cookieService.get('session');
    this.cookieService.delete('ID');
    this.cookieService.delete('session');
    console.log(session);
    this.userAccountsService.LogOut(session).subscribe(data => {
        console.log(data);
    })
  }
  
}
