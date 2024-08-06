import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DétailsCommande } from '../Models/DétailsCommande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsCommandeService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }
  deleteitems(commandid : number, itemid : number){
    return this.http.delete(this.baseUrl+`/DetailsCommande/${commandid}/items/${itemid}`) }
addItemToCommande(commandeId: number, item: DétailsCommande): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/DetailsCommande/${commandeId}/items`, item);
    }
updateItem(commandeId: number, itemId: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/DetailsCommande/${commandeId}/items/${itemId}`, item);
  }
}
