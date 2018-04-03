import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PdfService {

  constructor( private httpClient: HttpClient ) { }

  SendPdf(data: any){
    var body = {
      pdfData: data
    }

    var url = ''
  }

}
