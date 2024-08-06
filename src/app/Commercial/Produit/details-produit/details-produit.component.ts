import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { environment } from '../../../../environments/environment';
import { PorduitService } from '../../../Services/porduit.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PanierService } from '../../../Services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { TextInputComponent } from '../../../text-input/text-input.component';

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;
  baseUrl = environment.apiUrl;

  constructor(private shopService: PorduitService, private activatedRoute: ActivatedRoute, 
     private basketService: PanierService) {
      
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id === +id);
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        });
      },
      error: error => console.log(error)
    });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity() {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Ajouter au panier' : 'Mettre à jour le panier';
  }
}