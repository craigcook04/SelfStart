import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  inputtedUsername: boolean;
  username: string;
  constructor(private emailService: EmailService) { }

  ngOnInit() {
  }

  SendEmail(inputUsername: string) {
    this.inputtedUsername = true;
    this.username = inputUsername;

    this.emailService.SendRecoveryEmail(inputUsername).subscribe(data => {
      console.log(data);
    })
  }

}
