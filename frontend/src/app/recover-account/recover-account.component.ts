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
  constructor(private route: ActivatedRoute,
              private patientService: PatientService) { }

  ngOnInit() {
    //this component should have a hashed passed in the url
    this.hash = this.route.snapshot.paramMap.get("id");
  }

  ResetPassword(password: string, repeatPassword: string) {
    if(!password || !repeatPassword) {
      console.log('null field');
      return;
    }

    if(password != repeatPassword) {
      console.log('passwords dont match');
      return;
    }

    this.patientService.ChangePassword(this.hash, password).subscribe(data => {
      console.log(data);
    })

  }

}
