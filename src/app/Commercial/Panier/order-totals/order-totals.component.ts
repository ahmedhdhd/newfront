import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../text-input/text-input.component';
import { PanierService } from '../../../Services/panier.service';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.css'
})
export class OrderTotalsComponent {
  constructor(public panierservice : PanierService){}

}
