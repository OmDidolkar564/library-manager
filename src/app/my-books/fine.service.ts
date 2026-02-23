import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FineService {

  private baseUrl = 'http://localhost:3001/api/fines';

  constructor(private http: HttpClient) {}

  myFines() {
    return this.http.get(`${this.baseUrl}/my`);
  }

  payFine(id: number) {
    return this.http.post(`${this.baseUrl}/pay/${id}`, {});
  }
}