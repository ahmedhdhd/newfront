import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../Models/product';
import { PorduitService } from '../../../../Services/porduit.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  search: string = '';
 
  
  constructor(private PorduitService: PorduitService) {}
  ngOnInit(): void {
this.getProducts()  }

  getProducts() {
    this.PorduitService.getall(false).subscribe({
      next: response => {
        this.products = response;
        this.onSearchChange();
      },
      error: error => console.log(error)
    })
  }
  


 


  filterBySearch(product: Product): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.famille.name.toLowerCase().includes(searchLower) ||
      product.type.name.toLowerCase().includes(searchLower)
    );
  }

  
  onSearchChange() {
    this.filteredProducts = this.products.filter(product =>
      this.filterBySearch(product) 
  
      
    );
  }






  deleteProduct(id : number){
this.PorduitService.delete(id).subscribe({
  next :() => { this.ngOnInit() } ,

  error: error => console.log(error)


})
  }

}
