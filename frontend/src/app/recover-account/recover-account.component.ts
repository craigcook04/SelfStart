import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { PatientService } from '../patient.service'

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})

export class RecoverAccountComponent implements OnInit {

  username: string;
  hash: string;
  passwordNull: boolean;
  repeatPasswordNull: boolean;
  passwordsDontMatch: boolean;
  successfullyChangePassword: boolean;
  constructor(private route: ActivatedRoute,
              private patientService: PatientService) { }

  ngOnInit() {
    //this component should have a hashed passed in the url
    this.hash = this.route.snapshot.paramMap.get("id");
  }

  RemoveErrors() {
    var passwordBox = document.getElementById('inputPassword').style.borderColor = 'rgba(0,0,0,.15)';
    var repeatPasswordBox = document.getElementById('inputRepeatPassword').style.borderColor = 'rgba(0,0,0,.15)';
    this.passwordNull = false;
    this.repeatPasswordNull = false;
    this.passwordsDontMatch = false;
  }

  ResetPassword(password: string, repeatPassword: string) {
    var cannotContinue = false;
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

    this.patientService.ChangePassword(this.hash, password).subscribe(data => {
      var retObj: any = data;
      if(retObj.success) {

      }
      else {

      }
    })

  }

}
