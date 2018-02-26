import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'appliaction/json'})
}

@Injectable()
export class ImageService {

  constructor( private httpClient: HttpClient ) { }

  GetExerciseImage(exercise: String) {
    var url = '/api/image/' + exercise;
    return this.httpClient.get(url);
  }

  sendExerciseID( exercise_id: any , fileNames: any ) {
    var url = 'api/image/setid';
    var body = {
      _id: exercise_id,
      images: fileNames
    }
    return this.httpClient.put(url, body);
  }

}
