import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RehabPlansService {

  constructor(private http: HttpClient) { }
  
  getPlans(): any{
      return this.http.get('/api/rehabPlans');
  }
  getExercises(ID: string):  any{
    console.log("fdasfdsa");
    return this.http.get('/api/exercises/rehabPlan/' + ID);
  }
  addExercise(ID: string, exercise: any){
    console.log(ID)
    return this.http.put('/api/rehabPlans/' + ID + '/addEx', {exerciseObjects: exercise});
  }
  removePlan(ID: string){
    return this.http.delete('/api/rehabPlans/' + ID);
  }
  updatePlan(plan: any){
    console.log("im in the service");
    return this.http.put('api/rehabPlans/' + plan._id, plan);
  }
}
