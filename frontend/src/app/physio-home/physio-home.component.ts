import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysioHomeService } from '../physio-home.service';

@Component({
  selector: 'app-physio-home',
  templateUrl: './physio-home.component.html',
  styleUrls: ['./physio-home.component.css'],
  providers: [PhysioHomeService]
})
export class PhysioHomeComponent implements OnInit {

  constructor(private router: Router, private physioHomeService: PhysioHomeService) { }
  
  activated: any;
  appointments: any[];
  
  ngOnInit() {
    this.appointments = [];
     this.physioHomeService.getAppointments().subscribe(data =>{
      console.log(data);
      var retObj:any = data;
      this.appointments = retObj.appointment;
      console.log(this.appointments);
    });
  }
  show(appointment: any){
    if(this.activated == appointment){
      this.activated =null;
    }
    else{
      this.activated = appointment;
    }
    console.log(this.activated);
  }
  
  goToExercises(){
    this.router.navigate(['../exercises']);
  }
  goToPatients(){
    this.router.navigate(['../client']);
  }
  goToRehabPlans(){
    this.router.navigate(['../rehabplans']);
  }
  goToTests(){
    
  }
  goToReports(){
    
  }
}
