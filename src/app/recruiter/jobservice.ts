import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient) {}

  postJob(jobData: any): Observable<any> {
    return this.http.post('/api/jobs', jobData); // Use proxy or full URL
  }
    getAllJobs() {
  return this.http.get<any[]>('http://localhost:3000/api/jobs');
}
    getAllJob() {
  return this.http.get<any[]>('http://localhost:3000/api/jobs');
}
}