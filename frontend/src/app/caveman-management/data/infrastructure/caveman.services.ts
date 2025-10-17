
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caveman } from '../entities/caveman';


@Injectable({
  providedIn: 'root' 
})
export class CavemanService {
  private apiUrl = 'http://localhost:3000/caveman'; // A NestJS backend URL

  constructor(private http: HttpClient) { 
  }

  getAllCaveman(): Observable<Caveman[]> {
    return this.http.get<Caveman[]>(this.apiUrl);
  }

  getCavemanById(id: number): Observable<Caveman> {
    return this.http.get<Caveman>(`${this.apiUrl}/${id}`);
  }

  createCaveman(caveman: Caveman): Observable<Caveman> {
    return this.http.post<Caveman>(this.apiUrl, caveman);
  }

  updateCaveman(id: number, caveman: Caveman): Observable<Caveman> {
    return this.http.patch<Caveman>(`${this.apiUrl}/${id}`, caveman); 
  }

  deleteCaveman(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}