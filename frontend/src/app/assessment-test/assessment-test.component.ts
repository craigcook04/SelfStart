import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import {AssessmentTestService} from '../assessment-test.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../patient.service';
import {RehabPlansService} from '../rehab-plans.service'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assessment-test',
  templateUrl: './assessment-test.component.html',
  styleUrls: ['./assessment-test.component.css']
})
export class AssessmentTestComponent implements OnInit {
  showDrop: boolean; 
  type: string;
  shortAnswer: boolean = false;
  multipleChoice: boolean = false;
  rating: boolean = false;
  manageTests: boolean = true;
  showPatients: boolean = false;
  showCreat: boolean = true;
  viewDetails:boolean = false;
  viewDetailsCompleted: boolean = false;
  options: any[];
  optionText: any[];
  questions: any[];
  name: string;
  description: string;
  clients: any[];
  selectedPlan: any[];
  offset: number = 0;
  offset1: number = 0;
  offset2: number = 0;
  physioRating: number =0;
  pageInfo: string;
  tests = new MatTableDataSource();
  completedTests = new MatTableDataSource();
  displayedColumns = ["Patient", "Plan Assigned", "Date", "View Test Results"];  
  displayedColumns1 = ["Patient", "Test Assigned", "Date Completed", "Status", "View Test Results"];  
  
 
  length;
  pageSize = 10;
  pageSizeOptions = [10];
  // var currOption = 'c';
  length1;
  length2;
  
  currOption: string = 'c';
  
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private assessmentTestService: AssessmentTestService,  private modalService: NgbModal,
              private patientService: PatientService, private rehabPlanService: RehabPlansService, private config: NgbRatingConfig) {
                this.config.max = 10;
                
              }
              
  

  ngOnInit() {
    console.log("in it");
    this.showDrop = false;
    this.type = "Type Of Question";
    this.options = [];
    this.optionText = [];
    this.questions = [];
    this.clients = [];
    this.selectedPlan =[];
    this.tests = new MatTableDataSource();
    this.completedTests = new MatTableDataSource();
    this.assessmentTestService.getTests().subscribe(data => {
      var retObj: any = data;
      this.length = retObj.total;
      this.tests.data = retObj.docs;
      console.log(this.tests);
      console.log(data);
      console.log(this.tests);
      
    });
    this.assessmentTestService.getAllCompleted().subscribe(data =>{
      var retObj: any = data;
      this.length1 = retObj.total;
      this.completedTests.data = retObj.docs;
      console.log(data);
    })

    
  }
  // ngAfterViewInit() {
  //   this.tests.paginator = this.paginator;
  // }
  

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.tests.filter = filterValue;
    this.searchTests(filterValue);
  }
  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.tests.filter = filterValue;
    this.searchCompletedTests(filterValue);
  }
  applyFilter2(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.tests.filter = filterValue;
    this.searchPlans(filterValue);
 
    // this.questions.push(question);
  }
  searchPlans(searchString:string){
    
    this.rehabPlanService.SearchPlans(searchString, this.offset2).subscribe(data =>{
       if(data != []) {
        var retObj : any = data;
        this.clients =  retObj.docs;
        this.length2 = retObj.total;
        if(this.offset + 10 > this.length) {
          this.pageInfo = `${this.offset} - ${this.length} of ${retObj.total}` 
        }
        else{
          this.pageInfo = `${this.offset} - ${this.offset + 10} of ${retObj.total}`    
        }
        
      }
    });
  }
  enable(){
    this.showCreat = false;
    this.viewDetails = false;
    this.viewDetailsCompleted = false;
    this.manageTests = false;
    this.showPatients = false;
    var temp: string = "How Do you Feel Today"
    
    var tempQuestion = {
      questionText: temp,
      questionCode: "RA",
      answer: null
      
    }
    
    this.questions.push(tempQuestion);
    // this.manageTests = true;
    
  }
  enableAddQuestion(){
    
    this.showDrop = true;
  }
  changeSA(){
    console.log("fdasfdsa");
    this.type = "Short Answer";
    this.shortAnswer =true;
    this.multipleChoice = false;
    this.rating = false;
  }
  changeMC(){
    this.type = "Multiple Choice";
    this.shortAnswer =false;
    this.multipleChoice = true;
    this.rating = false;
  }
  changeRA(){
    this.type = "Rating";
    this.shortAnswer =false;
    this.multipleChoice = false;
    this.rating = true;
  }
  addOption(){
     console.log(this.currOption);
     if (this.options.length<=8){
      this.options.push(this.currOption);
      this.currOption = String.fromCharCode(this.currOption.charCodeAt(0) + 1);
     }
    
  }
  saveMCQuestion(){
    var temp: any = document.getElementById('inputOption');
    temp = temp.value;
    this.optionText.push(temp);
    var temp2: any = document.getElementById('inputOption2');
    temp2 = temp2.value;
    this.optionText.push(temp2);
    for (var i = 0; i<this.options.length; i++){
      var temp: any = document.getElementById(this.options[i]);
      temp = temp.value;
      this.optionText.push(temp);
      
    }
    var temp3: any = document.getElementById('inputMCQuestion');
    temp3 = temp3.value;
    var question = {
      questionText: temp3,
      questionCode: "MC",
      questionContent: this.optionText,
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.multipleChoice = false;
    this.type = "type of question";
    
    console.log(this.optionText);
    console.log(this.questions);
  }
  saveSAQuestion(){
    var temp: any = document.getElementById('inputShortAnswerQuestion');
    temp = temp.value;
    var question = {
      questionText: temp,
      questionCode: "SA",
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.shortAnswer = false;
    this.type = "type of question";
  }
  saveRatingQuestion(){
    var temp: any = document.getElementById('inputRatingQuestion');
    temp = temp.value;
    var question = {
      questionText: temp,
      questionCode: "RA",
      answer: null
    }
    this.questions.push(question);
    this.optionText = [];
    this.options =[];
    this.showDrop = false;
    this.rating = false;
    this.type = "type of question";
  }
  
  createTest(){
    var temp:any = document.getElementById('name');
    temp = temp.value;
    this.name = temp;
    
    var temp2:any = document.getElementById('description');
    temp2 = temp2.value;
    this.description = temp2;
    
    
    this.assessmentTestService.createPlan(this.name, this.description, this.questions).subscribe(data => {
      console.log(data);
    });
    this.tests = new MatTableDataSource();
    this.assessmentTestService.getTests().subscribe(data => {
      var retObj: any = data;
      this.tests.data = retObj.assessmentTest;
      console.log(this.tests);
      console.log(data);
      console.log(this.tests);
      
    });
    this.showDrop = false;
    this.rating = false;
    this.multipleChoice = false;
    this.showPatients = false;
    this.type = "type of question";
    this.showCreat = true;
    this.manageTests = false;
    this.viewDetails = false;
    this.viewDetailsCompleted = false;
    this.optionText = [];
    this.options =[];
    this.questions = [];
    //this.ngOnInit();
    //this.ngAfterViewInit();
    
  }
  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }
  
  openListOfPlans(){
     var temp:any = document.getElementById('name');
    temp = temp.value;
    this.name = temp;
    
    var temp2:any = document.getElementById('description');
    temp2 = temp2.value;
    this.description = temp2;
    
  
   this.showCreat =true;
   this.showDrop = false;
   this.rating = false;
   this.multipleChoice = false;
   this.type = "type of question";
   this.manageTests = false;
   
   this.rehabPlanService.getPlans().subscribe(data => {
     console.log(data);
     this.length2 = data.total;
     this.clients = Object.assign([], data.docs);
     console.log(this.clients);
   });
   this.showPatients = true;
   
    
  }
  
  
  
  openListOfPatients(){
    var temp:any = document.getElementById('name');
    temp = temp.value;
    this.name = temp;
    
    var temp2:any = document.getElementById('description');
    temp2 = temp2.value;
    this.description = temp2;
    
  
   this.showCreat =true;
   this.showDrop = false;
   this.rating = false;
   this.multipleChoice = false;
   this.type = "type of question";
   this.manageTests = false;
  
   this.patientService.GetAllPatients().subscribe(data => {
      console.log(data);
      this.clients = Object.assign([], data.docs);
      console.log('hello');
      // console.log(this.patients);
      console.log(this.clients);
    });
   
    this.showPatients = true;
    
  }
  assignTest(listOfClients: any[]){
    console.log(listOfClients);
    var clientIds: string[] = [];
    
    for (var i = 0; i<listOfClients.length; i++){
      clientIds.push(listOfClients[i].value);
    }
    for (var i = 0; i<clientIds.length; i++){
      this.assessmentTestService.createPlanwithAssignedTest(this.name, this.description, this.questions,clientIds[i]).subscribe(data => {
        console.log(data);
        var retObj: any = data;
        retObj = retObj.assessmentTest;
        this.assessmentTestService.linktoPlan(retObj._id, retObj.belongsTo).subscribe(data1 =>{
          console.log(data1);
          console.log("i hope this works!");
        });
      });
    }
    this.tests = new MatTableDataSource();
    this.assessmentTestService.getTests().subscribe(data => {
      var retObj: any = data;
      this.tests.data = retObj.assessmentTest;
      console.log(this.tests);
      console.log(data);
      console.log(this.tests);
      
    });
    this.showCreat = true;
    this.optionText = [];
    this.options =[];
    this.questions = [];
    this.showPatients = false;
    this.manageTests = false;
    console.log(clientIds);
  }
  showTable(){
    this.viewDetails = false;
    this.viewDetailsCompleted = false;
    this.manageTests = true;
    this.showPatients = false;
    this.showCreat = true;
    this.tests = new MatTableDataSource();
    this.assessmentTestService.getTests().subscribe(data => {
      var retObj: any = data;
      this.tests.data = retObj.docs;
      console.log(this.tests);
      console.log(data);
      console.log(this.tests);
      
    });
  }
  view(planSel: any){
    console.log("wohooo");
    //console.log(id);
    this.selectedPlan = planSel;
    this.manageTests = false;
    this.viewDetails = true;
    this.viewDetailsCompleted = false;
    
    console.log(this.selectedPlan);
    //this.managaeTests = false;
    
  }
  viewcomp(testSel: any){
    this.selectedPlan = testSel;
    this.manageTests = false;
    this.viewDetails = false;
    this.viewDetailsCompleted = true;
    
    console.log(this.selectedPlan);
    
    
  }
  deleteQuestion(que: any){
    console.log(que);
    var index = this.questions.indexOf(que);
    console.log(index);
    this.questions.splice(index,1);
    console.log(this.questions);
  }
  
  
  searchPatients(searchString: string, searchArea: string) {
    // var ascvsdesc;
    // if(this.ascendingOrd == true) {
    //   ascvsdesc = 'asc';
    // }
    // else {
    //   ascvsdesc = 'desc';
    // }
    this.patientService.SearchPatient(searchString, searchArea, this.offset, 'asc').subscribe(data => {
      if(data != []) {
        var retObj : any = data;
        this.clients = Object.assign([], retObj.docs);
      }
    });
  }
  NextPage(searchString: string, searchArea: string) {
    this.offset += 10;
    this.searchPatients(searchString, searchArea);
  }

  PreviousPage(searchString: string, searchArea: string) {
    if(this.offset != 0) {
      this.offset -= 10;
    }
    this.searchPatients(searchString, searchArea);
  }
  moveUp(q: any){
    var index = this.questions.indexOf(q);
    console.log(index);
    if (index!=1){
      var temp = this.questions[index-1];
      this.questions[index-1] = q;
      this.questions[index] = temp;
    }
  }
  moveDown(q:any){
    var index = this.questions.indexOf(q);
    console.log(index);
    if (index!=this.questions.length - 1){
      var temp = this.questions[index+1];
      this.questions[index+1] = q;
      this.questions[index] = temp;
    }
    
  }
  deleteOption(opt:any, Q:any){
    var index = this.questions.indexOf(Q);
    var indexOpt = this.questions[index].questionContent.indexOf(opt);
    if (this.questions[index].questionContent.length > 2){
      this.questions[index].questionContent.splice(indexOpt,1);
    }
  }
  updateQuestion(Q: any){
    var index = this.questions.indexOf(Q);
    var temp:any = document.getElementById('inputQuestionText');
    this.questions[index].questionText = temp.value;
    
    if (this.questions[index].questionContent != null){
      for (var i=0; i<this.questions[index].questionContent.length; i++){
        var opt:any  = document.getElementById(i.toString());
        console.log(opt.value);
        this.questions[index].questionContent[i] = opt.value;
      }
    }
    
  }
  addOptionInEdit(Q: any){
    var index = this.questions.indexOf(Q);
    this.questions[index].questionContent.push("");
  }
  
  SwitchPageEvent(pageEvent: any, searchString: string) {
    this.offset = pageEvent.pageIndex * pageEvent.pageSize;
    console.log('hello im switching');
    this.searchTests(searchString);
  }
  SwitchPageEvent1(pageEvent: any, searchString: string) {
    this.offset1 = pageEvent.pageIndex * pageEvent.pageSize;
    console.log('hello im switching');
    this.searchCompletedTests(searchString);
  }
  
   SwitchPageEvent2(pageEvent: any, searchString: string) {
    this.offset2 = pageEvent.pageIndex * pageEvent.pageSize;
    console.log('hello im switching');
    this.searchPlans(searchString);
  }

  searchCompletedTests(searchString: string){
    this.completedTests = new MatTableDataSource();
    this.assessmentTestService.searchCompletedTests(searchString, "name", this.offset, 'asc').subscribe(data =>{
      if(data != []) {
        var retObj : any = data;
        this.completedTests.data =  retObj.docs;
        this.length1 = retObj.total;
        if(this.offset + 10 > this.length) {
          this.pageInfo = `${this.offset} - ${this.length} of ${retObj.total}` 
        }
        else{
          this.pageInfo = `${this.offset} - ${this.offset + 10} of ${retObj.total}`    
        }
        
      }
    });
  }

  searchTests(searchString: string){
    this.tests = new MatTableDataSource();
    this.assessmentTestService.search(searchString, "name", this.offset, 'asc').subscribe(data =>{
       if(data != []) {
        var retObj : any = data;
        this.tests.data =  retObj.docs;
        this.length = retObj.total;
        if(this.offset + 10 > this.length) {
          this.pageInfo = `${this.offset} - ${this.length} of ${retObj.total}` 
        }
        else{
          this.pageInfo = `${this.offset} - ${this.offset + 10} of ${retObj.total}`    
        }
        
      }
    });
  }
  SendBack(index: any){
    console.log(index);
    this.physioRating = index;
  }
  assignFollowUp(physioComments: string){
    //this.patientService.
    var pat: any;
    var temp:any = this.selectedPlan;
    this.patientService.GetAllPatients().subscribe(data => {
      var retObj: any = data.docs;
      pat = retObj[0];
      console.log(pat);
      console.log(temp);
      console.log(physioComments)
      this.assessmentTestService.completeTest(temp.name, temp.description, temp.dateCompleted, temp.dateCreated, temp.questions, this.physioRating, physioComments, pat._id).subscribe(data =>{
        console.log(data);
      });
    });
    
    
  }
  closeInjury(physioComments:string){
    var temp: any = this.selectedPlan;
    this.assessmentTestService.closeInjury(physioComments, temp._id,this.physioRating).subscribe(data =>{
      console.log(data);
      this.completedTests = new MatTableDataSource();
      this.assessmentTestService.getAllCompleted().subscribe(data =>{
        var retObj: any = data;
        this.length1 = retObj.total;
        this.completedTests.data = retObj.docs;
        console.log(data);
      })
    });
  }
  
  
}
