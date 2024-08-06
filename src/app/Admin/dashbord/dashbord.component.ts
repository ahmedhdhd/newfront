import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [NavBarComponent,RouterOutlet,RouterLink],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
