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
  
    addUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/Users`, user);
    }
  
    updateUser(id: number, userData: User): Observable<User> {
      return this.http.put<any>(`${this.baseUrl}/Users/${id}`, userData);
    }
  
    deleteUser(id: number) {
      return this.http.delete(`${this.baseUrl}/Users/${id}`);
    }
  
    getutilisateurs(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl +`/Users`);
    }
 
    deleteuser(id : number){
      return this.http.delete(`${this.baseUrl}/Users/${id}`)
    }

  }