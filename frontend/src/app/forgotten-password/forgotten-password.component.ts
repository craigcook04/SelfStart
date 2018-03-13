import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { UserAccountsService } from '../user-accounts.service'

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  inputtedUsername: boolean;
  username: string;
  badUsername: boolean;
  constructor(private emailService: EmailService,
              private userAccountService: UserAccountsService) { }

  ngOnInit() {
  }

  SendEmail(inputUsername: string) {
    this.inputtedUsername = true;
    this.username = inputUsername;

    this.userAccountService.RequestResetPassword(inputUsername).subscribe(data => {
      var retObj :any = data;
      if(retObj.success = true) {
        this.inputtedUsername = true;
        this.username = inputUsername;
      }
      else {
        this.badUsername = true;
      }
    })
    // this.emailService.SendRecoveryEmail(inputUsername).subscribe(data => {
    //   console.log(data);
    // })
  }

}
