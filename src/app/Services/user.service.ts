import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    baseUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }

    getUserById(id: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/Users/${id}`);
    }
  
    add(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/Users`, user);
    }
  
    update(id: number, userData: User): Observable<User> {
      return this.http.put<any>(`${this.baseUrl}/Users/${id}`, userData);
    }
  
    delete(id: number) {
      return this.http.delete(`${this.baseUrl}/Users/${id}`);
    }
  
    getall(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl +`/Users`);
    }
  }