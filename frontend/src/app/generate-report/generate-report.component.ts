import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { PaymentService } from '../payment.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  patient: any;
  paymentHistory: any;

  constructor(private patientService: PatientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private paymentService: PaymentService, 
              private cookieService: CookieService) { }

  private chartType:string = 'line';
  
  private chartDatasets:Array<any> = [
    {data: [2, 3, 5, 5, 7, 8, 9], label: 'Physio Rating'},
    {data: [4, 4, 5, 5, 6, 8, 10], label: 'Patient Rating'}
  ];

  private chartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  private chartColors:Array<any> = [
    {
        backgroundColor: 'rgba(220,220,220,0.2)',
        borderColor: 'rgba(220,220,220,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
    },
    {
        backgroundColor: 'rgba(151,187,205,0.2)',
        borderColor: 'rgba(151,187,205,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(151,187,205,1)'
    }
  ];

  private chartOptions:any = { 
    responsive: true
  };

  

  ngOnInit() {
    var patientID = this.activatedRoute.snapshot.paramMap.get("id");
    this.patientService.GetPatientByPatientID(patientID).subscribe(data => {
      var retObj: any = data;
      console.log(data);
      this.patient = retObj.patient;
    })
    var userID = this.cookieService.get('ID');
    console.log("id",userID);
    this.paymentService.GetPaymentHistory(userID).subscribe(data => {
      console.log(data);
      var retObj: any = data;
      this.paymentHistory = retObj.payments;
    })

  }

  CalculateAge(DOB: string) {
    var years = moment().diff(DOB, 'years');
    return years;
  }

  chartClicked(e: any): void { 
  } 

  chartHovered(e: any): void {   
  }

}
