import { PatientService } from '../patient.service';
import { ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { PaymentService } from '../payment.service'
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AssessmentTestService } from '../assessment-test.service';
import { EmailService } from '../email.service'
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})

export class GenerateReportComponent implements OnInit {

  patient: any;
  paymentHistory: any;

  @ViewChild('test') test: ElementRef;
  @ViewChild('test2') test2: ElementRef;

  constructor(private patientService: PatientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private paymentService: PaymentService, 
              private cookieService: CookieService,
              private assessmentService: AssessmentTestService,
              private emailService: EmailService) { }

  
  currClient: any;
  textAreaVal: string = "";
  chartType: string = 'line';
  chartDatasets: Array<any>;
  // = [
  //   {data: [0, 2, 3, 3, 5, 7, 8, 9], label: 'Physio Rating'},
  //   {data: [0, 4, 4, 5, 6, 6, 8, 10], label: 'Patient Rating'}
  // ];
  physioRatings: Array<number> = [];
  clientRatings: Array<number> = [];
  assesmentDates: Array<any> = [];
  chartLabels: Array<any> = [0, 1, 2, 3, 4, 5, 6, 7];

  chartColors: Array<any> = [
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
  }
  patient2: any;
  completedTests: any[];

  

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

    this.assessmentService.GetUsersInitialInjuries(userID).subscribe(data => {
      console.log(data);
    })

    this.assessmentService.GetCompletedTests(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(data =>{
      console.log(data);
      let obj: any = data;
      this.completedTests = obj.completedTests;
      this.completedTests.forEach(element =>{
        console.log(element);
        this.physioRatings.push(element.physioRate);
        let obj: string = element.dateCompleted;
        obj = obj.split('T')[0];
        this.assesmentDates.push(obj);
        this.clientRatings.push(element.questions[0]);
      })
      this.physioRatings.unshift(0);
      this.assesmentDates.unshift('Start of Time');
      this.clientRatings.unshift(0);

      //set the chart datasets
      this.chartDatasets = [
        {data: this.physioRatings, label: "Physio Ratings"},
        {data: this.clientRatings, label: "Client Ratings"}
      ];
      this.chartLabels = this.assesmentDates;
    })

    this.patientService.GetSpecificPatient(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(data =>{
      let obj: any = data;
      this.currClient = obj.patient;
      console.log(this.currClient);
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

  PrintReport(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    }

    let content = this.test.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 180,
      'elementHandlers': specialElementHandlers
    });

    doc.save(this.currClient.familyName + "_" + this.currClient.givenName + ".pdf");

  }

  EmailReport(){
    let doc = new jsPDF();
    
        let specialElementHandlers = {
          '#editor': function(element, renderer){
            return true;
          }
        }
    
        let content = this.test.nativeElement;
    
        doc.fromHTML(content.innerHTML, 15, 15, {
          'width': 180,
          'elementHandlers': specialElementHandlers
        });

        let pdf = doc.output('datauristring');
    
        this.emailService.SendPDFToClient(pdf).subscribe(data => {
          console.log(data);
        })
        //doc.save(this.currClient.familyName + "_" + this.currClient.givenName + ".pdf");
  }

}
