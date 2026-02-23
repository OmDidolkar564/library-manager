import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BookService {

  private baseUrl = 'http://localhost:3001/api/books';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/detailed`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/detailed/${id}`);
  }

  search(q: string) {
    return this.http.get(`${this.baseUrl}/search?q=${q}`);
  }

  create(book: any) {
    return this.http.post(`${this.baseUrl}/create`, book);
  }

  update(id: number, book: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, book);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}