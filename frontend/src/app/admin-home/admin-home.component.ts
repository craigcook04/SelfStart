import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../user-accounts.service';
import { EmailService} from '../email.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PhysiotherapistService } from '../physiotherapist.service';
import { ExerciseService } from '../exercise.service';
import { PatientService } from '../patient.service';
import { RehabPlansService } from '../rehab-plans.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  resetUsers: any[];
  physioList: any[];
  currPhysios: any;
  currPatients: any;
  currExercises: any;
  currPlans: any;

  constructor(private router: Router, 
              private userAccountService: UserAccountsService,
              private emailService: EmailService,
              private modalService: NgbModal,
              private physioService: PhysiotherapistService,
              private exerciseService: ExerciseService,
              private clientService: PatientService,
              private rehabPlanService: RehabPlansService) { }

  ngOnInit() {
    this.userAccountService.GetUsersWantingAPasswordReset().subscribe(data => {
      this.resetUsers = Object.assign([], data);
    })
    this.physioService.getTherapists().subscribe(data =>{
      let obj: any = data;
      this.physioList = obj.physiotherapist;
      this.currPhysios = this.physioList.length;
      console.log(this.currPhysios);
    })
    this.exerciseService.GetAllExercises().subscribe(data => {
      let obj: any = data;
      this.currExercises = obj.total;
      console.log(this.currExercises);
    })
    this.clientService.GetAllPatients().subscribe(data =>{
      let obj: any = data;
      this.currPatients = obj.total;
      console.log(this.currPatients);
    })
    this.rehabPlanService.getPlans().subscribe(data =>{
      let obj: any = data;
      this.currPlans = obj.total;
      console.log(this.currPlans);
    })
  }
  
  goToExercises(){
    this.router.navigate(['../exercises']);
  }
  
  gotToPatients(){
    this.router.navigate(['../client']);
  }
  
  goToDynamicForm(){
    this.router.navigate(['../manageforms']);
    
  }
  
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }

  ResetPassword(username: string, resetModal) {
    console.log('here');
    this.emailService.SendRecoveryEmail(username).subscribe(data => {
      console.log(data);
      this.modalService.open(resetModal);
      this.userAccountService.GetUsersWantingAPasswordReset().subscribe(data => {
        console.log(data);
        this.resetUsers = Object.assign([], data);
      })
    })
  }
  
}

