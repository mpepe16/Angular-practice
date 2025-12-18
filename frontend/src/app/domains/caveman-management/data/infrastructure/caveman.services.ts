
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caveman, CreateCavemanDto, UpdateCavemanDto } from '../entities/caveman';


@Injectable({
  providedIn: 'root' 
})
export class CavemanService {
  private apiUrl = `http://localhost:3000/users`; // A NestJS backend URL

  constructor(private http: HttpClient) { 
  }

  findAllCavemen(userId: string): Observable<Caveman[]> {
    const url = `${this.apiUrl}/${userId}/caveman`;
    return this.http.get<Caveman[]>(url);
  }
  findCavemanById(userId:string, id: string): Observable<Caveman> {
    return this.http.get<Caveman>(`${this.apiUrl}/${userId}/caveman/${id}`);
  }

  createCaveman(userId:string, caveman: CreateCavemanDto): Observable<Caveman> {
    return this.http.post<Caveman>(`${this.apiUrl}/${userId}/caveman`, caveman);
  }

  updateCaveman(userId:string, id: string, caveman: UpdateCavemanDto): Observable<Caveman> {
    return this.http.patch<Caveman>(`${this.apiUrl}/${userId}/caveman/${id}`, caveman); 
  }

  deleteCaveman(userId:string,id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/caveman/${id}`);
  }
}