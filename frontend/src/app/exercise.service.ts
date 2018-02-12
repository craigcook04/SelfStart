import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ExerciseService {

  constructor( private httpClient: HttpClient ) { }

  GetAllExercises() : any{
    var url = '/api/exercises';
    return this.httpClient.get(url);
  }

  DeleteExercise(id: string) {
    var url = '/api/exercises/' + id;
    return this.httpClient.delete(url);
  }

  UpdateExercise(id:string,  exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media: any) : any {
    // body of the exercise request
    var body ={
      name: exName,
      description: descrip,
      objectives: objs,
      authorName: authName,
      actionSteps: actSteps,
      location: loc,
      frequency: freq,
      duration: dur,
      targetDate: targDate,
      multimedia: media
    }

    var url = '/api/exercises/' + id;
    return this.httpClient.put(url, body);
  }

  AddExercise(exName: string, descrip: string, objs: string, authName: string, actSteps: string, loc: string, freq: number, dur: number, targDate: Date, media: any) : any{
    var body ={
      name: exName,
      description: descrip,
      objectives: objs,
      authorName: authName,
      actionSteps: actSteps,
      location: loc,
      frequency: freq,
      duration: dur,
      targetDate: targDate,
      multimedia: media
    }

    var url = '/api/exercises';
    return this.httpClient.post(url, body);
  }
  
}
