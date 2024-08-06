import { Component } from '@angular/core';
import { CommandeService } from '../../../../../Services/commande.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {

  search=""
  commandes: any[] = [];

  constructor(private CommandeService: CommandeService , private route : Router) { }

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes() {
    this.CommandeService.getall().subscribe({
    next: response => {
      this.commandes = response
    },
    error : error => console.log(error)
    })
  }
  
  
  
public navigatell(id : number){
this.route.navigate([`/Admin/details/${id}`])
  }

}
