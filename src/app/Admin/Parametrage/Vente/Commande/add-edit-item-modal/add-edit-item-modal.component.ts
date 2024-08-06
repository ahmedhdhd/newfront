import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DétailsCommande } from '../../../../../Models/DétailsCommande';
import { Product } from '../../../../../Models/product';
import { environment } from '../../../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-item-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './add-edit-item-modal.component.html',
  styleUrl: './add-edit-item-modal.component.css'
})
export class AddEditItemModalComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<DétailsCommande>();
  @Input() item?: any;
  baseUrl = environment.apiUrl;

  itemForm: FormGroup;
  productCtrl = new FormControl();
  filteredProducts: Observable<Product[]>;
  products: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.itemForm = this.fb.group({
      name: [''],
      Qte: ['']
    });

    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProducts(value || ''))
    );
  }

  ngOnInit(): void {
    this.loadProducts();
    if (this.item) {
      this.patchItem();
    }
  }

  private loadProducts(): void {
    this.http.get<Product[]>(`${this.baseUrl}/Produit/all`).subscribe(
      (products: Product[]) => {
        this.products = Array.isArray(products) ? products : [];
      },
      error => {
        console.error('Failed to load products:', error);
        this.products = [];
      }
    );
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  onProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    this.selectedProduct = this.products.find(product => product.name === selectedProductName);
    if (this.selectedProduct) {
      this.itemForm.patchValue({ name: this.selectedProduct.name });
    }
  }

  patchItem(): void {
    if (this.item) {
      this.itemForm.patchValue({
        name: this.item.idProduit,
        Qte: this.item.qte
      });
      this.selectedProduct = this.products.find(product => product.id === this.item?.idProduit);
    }
  }

  addItem(): void {
    const formValue = this.itemForm.value;
    if (this.selectedProduct) {
      const detailsCommande: DétailsCommande = {
        qte: formValue.Qte,
        prixUnitaire: this.selectedProduct.prixTTC,
        prixTotal: formValue.Qte * this.selectedProduct.prixTTC,
        idProduit: this.selectedProduct.id,
        id: this.item ? this.item.id : 0
      };
      console.log('Item added:', detailsCommande);
      this.itemAdded.emit(detailsCommande);
    }
  }}
