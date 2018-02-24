import { Component, OnInit } from '@angular/core';
import { NewClientService } from '../new-client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})

export class NewClientComponent implements OnInit {

  constructor(private newClientService: NewClientService) { }

  ngOnInit() {
  }

  createClient(lastName: String, firstName: String, email: String, DOB: String, postalCode: String, phone: String, maritalStatus: String, healthCardNumber: String, occupation: String, others: String) {
    this.newClientService.CreateClient(firstName, lastName, email, DOB, postalCode, phone, maritalStatus, healthCardNumber, occupation, others).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      if(retObj.success == true) {
        //the user will be redirected showing success
      }
      else {
        //the user will be shown an error in the creation problem along the lines of there being a server problem.
      }
    })
  }

}
