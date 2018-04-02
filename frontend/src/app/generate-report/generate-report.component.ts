import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  patient: any;
  constructor(private patientService: PatientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    var patientID = this.activatedRoute.snapshot.paramMap.get("id");
    this.patientService.GetPatientByPatientID(patientID).subscribe(data => {
      var retObj: any = data;
      console.log(data);
      this.patient = retObj.patient;
    })
  }

}
