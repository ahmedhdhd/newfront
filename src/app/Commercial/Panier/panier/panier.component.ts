import { Component } from '@angular/core';
import { PanierService } from '../../../Services/panier.service';
import { OrderTotalsComponent } from "../order-totals/order-totals.component";
import { BasketSummaryComponent } from "../basket-summary/basket-summary.component";
import { BasketItem } from '../../../Models/basket';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../text-input/text-input.component';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [OrderTotalsComponent, BasketSummaryComponent,TextInputComponent,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],

  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
constructor(public panierservice : PanierService){}
incrementQuantity(item: BasketItem) {
  this.panierservice.addItemToBasket(item);
}

removeItem(event: {id: number, quantity: number}) {
  this.panierservice.removeItemFromBasket(event.id, event.quantity);
}
}
