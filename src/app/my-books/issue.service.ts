import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class IssueService {

  private baseUrl = 'http://localhost:3001/api/issues';

  constructor(private http: HttpClient) {}

  borrow(bookId: number) {
    return this.http.post(`${this.baseUrl}/borrow`, { bookId });
  }

  returnBook(issueId: number) {
    return this.http.put(`${this.baseUrl}/return/${issueId}`, {});
  }

  renew(issueId: number) {
    return this.http.put(`${this.baseUrl}/renew/${issueId}`, {});
  }

  myIssues() {
    return this.http.get(`${this.baseUrl}/my`);
  }

  allIssues() {
    return this.http.get(`${this.baseUrl}/all`);
  }
}