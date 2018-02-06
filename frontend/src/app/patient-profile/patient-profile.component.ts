import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service'

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.GetAllPatients().subscribe(data => {
      console.log(data);
    })
  }

}
