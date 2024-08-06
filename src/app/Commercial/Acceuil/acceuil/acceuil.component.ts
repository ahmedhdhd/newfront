import { Component } from '@angular/core';
import { CarouselModule  } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

}
