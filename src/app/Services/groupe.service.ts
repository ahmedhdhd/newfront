import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../Models/Groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getGroupById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Groupe/${id}`);
  }

  add(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${this.baseUrl}/Groupe`, groupe);
  }

  update(id: number, groupData: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(`${this.baseUrl}/Groupe/${id}`, groupData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Groupe/${id}`);
  }
  getall(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'/Groupe');
  }
}