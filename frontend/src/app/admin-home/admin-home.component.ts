import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../user-accounts.service';
import { EmailService} from '../email.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  resetUsers: any[];
  constructor(private router: Router, 
              private userAccountService: UserAccountsService,
              private emailService: EmailService ) { }

  ngOnInit() {
    this.userAccountService.GetUsersWantingAPasswordReset().subscribe(data => {
      this.resetUsers = Object.assign([], data);
    })
  }
  
  goToExercises(){
    this.router.navigate(['../exercises']);
  }
  
  gotToPatients(){
    this.router.navigate(['../client']);
  }
  
  goToDynamicForm(){
    this.router.navigate(['../manageforms']);
    
  }
  
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }

  ResetPassword(username: string) {
    this.emailService.SendRecoveryEmail(username).subscribe(data => {
      console.log(data);
    })
  }
  
}

