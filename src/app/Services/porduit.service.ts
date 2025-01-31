import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Pagination } from '../Models/pagination';
import { Product, ShopParams } from '../Models/product';
import { User } from '../Models/user';
import { Type } from '../Models/type';
import { Famille } from '../Models/famille';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PorduitService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  brands: Famille[] = [];
  types: Type[] = [];
  users: User[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();
  promo:boolean=false;

  
  constructor(private http: HttpClient ) { }
  
  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();
  
    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }
  
    let params = new HttpParams();
  
    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId.toString());
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId.toString());
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
  
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);
  
    return this.http.get<Pagination<Product[]>>(this.baseUrl + '/produit', { params }).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    );
  }
  getall(promo: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Produit/all?promo=${promo}`);
}
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  get(id: number): Observable<Product> {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + '/Produit/' + id);
  }
  
 
  add(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/Produit`, formData);
  }

  update(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/Produit/${id}`, formData);
  }
  delete(id : number){
    return this.http.delete(`${this.baseUrl}/Produit/${id}`)
  }

}
