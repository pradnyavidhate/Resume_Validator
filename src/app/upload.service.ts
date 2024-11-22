import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    private apiUrl = 'http://20.163.164.196:8000/uploadresume?requestid=PUR124'; // Replace with actual URL

    constructor(private http: HttpClient) {}
  
    uploadFile(file: File): Observable<HttpEvent<any>> {
      const formData = new FormData();
      formData.append('file', file);
  
      return this.http.post(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events',
      });
    }
}
