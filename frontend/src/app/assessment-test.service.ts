import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class AssessmentTestService {

    constructor(private http: HttpClient) { }


    createPlan(name1: string, description1: string, questions1: any[]){
        var url = '/api/assessmentTest';
        var body = {
            name: name1,
            description: description1,
            questions: questions1,
            completed: false
            
        };
        return this.http.post(url,body);
    }    
    
    GetPlans() {
        var url = '/api/assessmentTest';

        return this.http.get(url);
    }
}
