import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { PatientService} from '../patient.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isClient: boolean;
  isPhysio: boolean;
  isAdmin: boolean;
  passwordNull: boolean;
  repeatPasswordNull: boolean;
  passwordsDontMatch: boolean;
  successfullyChangedPassword: boolean;
  couldntProcessRequest: boolean;
  incorrectOldPassword: boolean;
  constructor(private route: ActivatedRoute,
              private cookieService: CookieService,
              private patientService: PatientService) { }

  ngOnInit() {
    var url = this.route.routeConfig.path;
    if(url.includes('admin')) {
      this.isAdmin = true;
    }
    else if(url.includes('client')) {
      this.isClient = true;
    }
    else {
      this.isPhysio = true;
    }
    this.successfullyChangedPassword = false;
    this.couldntProcessRequest = false;
  }

  ResetPassword(password: string, repeatPassword: string, tempPassword: string) {
    var cannotContinue = false;
    console.log('hello');
    if(!tempPassword) {
      var tempPasswordBox = document.getElementById('inputTempPassword').style.borderColor = 'red';
      cannotContinue = true;
    }

    if(!password) {
      var passwordBox = document.getElementById('inputPassword').style.borderColor = 'red';
      cannotContinue = true;
      this.passwordNull = true;
    }

    if(!repeatPassword) {
      var repeatPasswordBox = document.getElementById('inputRepeatPassword').style.borderColor = 'red';
      cannotContinue = true;
      this.repeatPasswordNull = true;
    }

    if(password != repeatPassword && !cannotContinue) {
      console.log('passwords dont match');
      this.passwordsDontMatch = true;
      return;
    }

    if(cannotContinue) {
      return;
    }

    var userId = this.cookieService.get('ID');
    console.log(userId);
    this.patientService.GetSalt(userId).subscribe(data => {
      var retObj: any = data;
      console.log(retObj)
      if(retObj.success == true){
        this.patientService.ChangePassword(userId, password, tempPassword, retObj.salt).subscribe(data => {
          var retObj: any = data;
          console.log("returned", data);
          if(retObj.success) {
            this.successfullyChangedPassword = true;            
          }
          else {
            if(retObj.incTempPass) {
              this.incorrectOldPassword = true;
              document.getElementById('inputOldPassword').style.borderColor = "red";
            } 
            else {
              this.couldntProcessRequest = true;              
            }
          }
        })
      }
      
    })

  }

}
