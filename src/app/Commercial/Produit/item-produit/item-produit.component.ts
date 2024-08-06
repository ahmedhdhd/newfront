import { Component, Input } from '@angular/core';
import { PanierService } from '../../../Services/panier.service';
import { Product } from '../../../Models/product';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../text-input/text-input.component';

@Component({
  selector: 'app-item-produit',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './item-produit.component.html',
  styleUrl: './item-produit.component.css'
})
export class ItemProduitComponent {
  @Input() product?: Product;
  baseUrl = environment.apiUrl;
  
  constructor(private PanierService: PanierService) {}

  addItemToBasket() {
   // this.product && this.PanierService.addItemToBasket(this.product);
  }  
}
