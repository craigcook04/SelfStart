import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})

export class RecoverAccountComponent implements OnInit {

  username: string;
  constructor() { }

  ngOnInit() {
    //this component should have a hashed passed in the url
    this.username = "temp username"; //to be changed once there is actually a server call to be made
  }

}
