import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Commande } from '../Models/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }
  getall(): Observable<Commande[]>{
    return this.http.get<Commande[]>(this.baseUrl+"/Commandes")
  }
  getCommandebyid(id: string) {
    return this.http.get<Commande>(this.baseUrl + `/Commandes/${id}` );
  }
  updatecommande(commandeId : number , commande : Commande) : Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Commandes/${commandeId}`,commande);
  }
}
