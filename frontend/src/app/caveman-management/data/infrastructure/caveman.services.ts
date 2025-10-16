
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Caveman {
  id?: number; 
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root' 
})
export class CavemanService {
  private apiUrl = 'http://localhost:3000/caveman'; // A NestJS backend URL-je

  constructor(private http: HttpClient) { }

  getAllCavemen(): Observable<Caveman[]> {
    console.log("service called");
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