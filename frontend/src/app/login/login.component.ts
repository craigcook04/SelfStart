import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../user-accounts.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userAccountsService: UserAccountsService,
              private router: Router) { }

  ngOnInit() {
  }

  Login(username: string, password: string) {
    this.userAccountsService.Login(username, password).subscribe(data => {
      var retObj: any = data;
      if(retObj.success = true) {
        if(retObj.changePass == true) {
          var url = '../login/recover/' + retObj.userID;
          this.router.navigate([url]);
        }
        else {
          //router to the success screen
        }
      }
    })
  }

}
