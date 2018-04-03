import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AssessmentTestService } from '../assessment-test.service';
import {ActivatedRoute, Router} from '@angular/router'
import { PatientService } from '../patient.service';

import * as jsPDF from 'jspdf';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

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
  chartOptions: any = { 
    responsive: true,
  };
  patient: any;
  completedTests: any[];

  @ViewChild('test') test: ElementRef;

  constructor(  private assessmentService: AssessmentTestService,
                private activatedRoute: ActivatedRoute,
                private patientService: PatientService,
                private pdfService: PdfService) { }

  ngOnInit() {
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
        console.log(pdf);
    
        //doc.save(this.currClient.familyName + "_" + this.currClient.givenName + ".pdf");
  }

}
