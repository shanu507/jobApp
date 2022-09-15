import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jobs } from './store/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Jobs[]>('http://localhost:3000/jobs');
  }

  create(payload: Jobs) {
    return this.http.post<Jobs>('http://localhost:3000/jobs', payload);
  }

  update(payload: Jobs) {
    return this.http.put<Jobs>(
      `http://localhost:3000/jobs/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/jobs/${id}`);
  }
}
