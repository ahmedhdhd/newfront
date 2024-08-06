import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from '../Models/type';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }
  
  getTypeById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Types/${id}`);
  }
  getall(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Types`);
  }
  add(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.baseUrl}/Types`, type);
  }

  update(id: number, typeData: Type): Observable<Type> {
    return this.http.put<Type>(`${this.baseUrl}/Types/${id}`, typeData);
  } 
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Types/${id}`);
  }
  
}
