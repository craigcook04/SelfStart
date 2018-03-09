import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  inputtedUsername: boolean;
  username: string;
  constructor() { }

  ngOnInit() {
  }

  SendEmail(inputUsername: string) {
    this.inputtedUsername = true;
    this.username = inputUsername;
  }

}
