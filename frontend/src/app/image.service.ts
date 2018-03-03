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

  sendExerciseID( exercise_id: any , fileName: any ) {
    var url = 'api/image/setid';
    var body = {
      _id: exercise_id,
      image: fileName
    }
    return this.httpClient.put(url, body);
  }

  deleteImage( image: any ){
    var url = "/api/image/" + image;
    return this.httpClient.delete(url);
  }

}
