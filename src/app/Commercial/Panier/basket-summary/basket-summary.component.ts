import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../../../Models/basket';
import { environment } from '../../../../environments/environment';
import { PanierService } from '../../../Services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.css'
})
export class BasketSummaryComponent{
@Output() addItem = new EventEmitter<BasketItem>();
@Output() removeItem = new EventEmitter<{id: number, quantity: number}>();
@Input() isBasket = true;
baseUrl = environment.apiUrl;

constructor(public PanierService: PanierService) {}

addBasketItem(item: BasketItem) {
  this.addItem.emit(item)
}

removeBasketItem(id: number, quantity = 1) {
  this.removeItem.emit({id, quantity})
}


updateQuantity(item: BasketItem, quantity: string) {
  const newQuantity = parseInt(quantity, 10);
  if (newQuantity > 0) {
    const difference = newQuantity - item.quantity;
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        this.addBasketItem(item);
      }
    } else {
      for (let i = 0; i < Math.abs(difference); i++) {
        this.removeBasketItem(item.id, 1);
      }
    }
  }
}
}