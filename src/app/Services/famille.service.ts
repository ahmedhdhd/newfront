import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Famille } from '../Models/famille';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }
  getall(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Famille`);
  }

  getFamilleById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Famille/${id}`);
  }

  add(Famille: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Famille`, Famille);
  }


  update(id: number, Famille: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Famille/${id}`, Famille);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Famille/${id}`);
  }


}
