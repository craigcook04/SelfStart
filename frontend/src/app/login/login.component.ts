import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userAccountsService: UserAccountsService) { }

  ngOnInit() {
  }

  Login(username: string, password: string) {
    this.userAccountsService.Login(username, password).subscribe(data => {
      console.log(data);
    })
  }

}
