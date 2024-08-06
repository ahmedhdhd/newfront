import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../Models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();
  constructor(private http: HttpClient) { }

  getBasket() {
    
   const s: string = localStorage.getItem("basket") ?? '{}'; 
   const jsonObject: Basket = JSON.parse(s);
       
       this.basketSource.next(jsonObject);
               this.calculateTotals();
}


  setBasket(basket: Basket) {        
                this.basketSource.next(basket);   
                     this.calculateTotals();  
                     let jsonString: string = JSON.stringify(basket);
            
            localStorage.setItem("basket" ,jsonString )
            this.basketSource.next(basket);   
                      }
 
                      getCurrentBasketValue() {
                        return this.basketSource.value;
                      }
                    
                      addItemToBasket(item: Product | BasketItem, quantity = 1) {
                        if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
                        const basket = this.getCurrentBasketValue() ?? this.createBasket();
                        basket.items = this.addOrUpdateItem(basket.items, item, quantity);
                        this.setBasket(basket);
                      }
                    
                      removeItemFromBasket(id: number, quantity = 1) {
                        const basket = this.getCurrentBasketValue();
                        if (!basket) return;
                        const item = basket.items.find(x => x.id === id);
                        if (item) {
                          item.quantity -= quantity;
                          if (item.quantity === 0) {
                            basket.items = basket.items.filter(x => x.id !== id);
                          }
                          if (basket.items.length > 0) this.setBasket(basket);
                          else this.deleteBasket(basket);
                        }
                      }
                    
                      deleteBasket(basket: Basket) {
                        return this.http.delete(this.baseUrl + '/basket?id=' + basket.id).subscribe({
                          next: () => {
                            this.deleteLocalBasket();
                          }
                        })
                      }
                    
                      deleteLocalBasket() {
                        this.basketSource.next(null);
                        this.basketTotalSource.next(null);
                        localStorage.removeItem('basket_id');
                      }
                      
                      private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
                        const item = items.find(x => x.id === itemToAdd.id);
                        if (item) item.quantity += quantity;
                        else {
                          itemToAdd.quantity = quantity;
                          items.push(itemToAdd);
                        }
                        return items;
                      }
                    
                      private createBasket(): Basket {
                        const basket = new Basket();
                        localStorage.setItem('basket_id', basket.id);
                        return basket;
                      }
                    
                      private mapProductItemToBasketItem(item: Product): BasketItem {
                        return {
                          id: item.id,
                          productName: item.name,
                          price: item.prixTTC,
                          prixTTC: item.prixTTC,
                          prixHT: item.prixHT,
                          tva: item.tva,
                          quantity: 0,
                          pictureUrl: item.imageUrl,
                          brand: item.famille,
                          type: item.type
                        }
                      }
                    
                      private calculateTotals() {
                        const basket = this.getCurrentBasketValue();
                        if (!basket) return;
                        const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
                        const total = subtotal + basket.shippingPrice;
                        this.basketTotalSource.next({shipping: basket.shippingPrice, total, subtotal});
                      }
                    
                      private isProduct(item: Product | BasketItem): item is Product {
                        return (item as Product).famille !== undefined;
                      }
                    
}
