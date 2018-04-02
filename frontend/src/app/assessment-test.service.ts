import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AssessmentTestService {

    constructor(private http: HttpClient,
                private cookieService: CookieService) { }


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
    getTests(){
        var url = '/api/assessmentTest?s=name&sortorder=asc&offset=0';
        return this.http.get(url);
    }
    search(searchString: string, searchArea: string, offset, ascvsdesc){
        var url = '/api/assessmentTest?q=' + searchString + '&s=' + searchArea + '&sortorder=' + ascvsdesc + '&offset=' + offset;
        return this.http.get(url);
    }
    createPlanwithAssignedTest(name1: string, description1: string, questions1: any[], clientId: string){
        var url = '/api/assessmentTest';
        var body = {
            name: name1,
            description: description1,
            questions: questions1,
            completed: false,
            belongsTo: clientId
            
        };
        return this.http.post(url,body);

    }    
    
    GetPlans() {
        var url = '/api/assessmentTest';

        return this.http.get(url);
    }

    SendCompletedQuestions(assessmentID: string, completedQuestions) {
        var url = "/api/assessmentTest/client/completed";
        var body = {
            assessmentID: assessmentID,
            questions: completedQuestions
        }

        return this.http.put(url, body);

    }
    
    completeTest(name: string, description: string, dateCompleted: Date, dateCreated: Date, questions:any, physioRating: number, phsyioComments: string, pat_id: string){
        var url = "/api/assessmentTest/completedTests";
        var body = {
            name: name,
            description: description,
            completed: false,
            dateCompleted: dateCompleted,
            dateCreated: dateCreated,
            questions: questions,
            physioRate: physioRating,
            physioDescription: phsyioComments,
            patient: pat_id
        }
        return this.http.post(url, body);
    }
    
}
