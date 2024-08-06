import { Component } from '@angular/core';
import { Famille } from '../../../../Models/famille';
import { FamilleService } from '../../../../Services/famille.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-famille',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './list-famille.component.html',
  styleUrl: './list-famille.component.css'
})
export class ListFamilleComponent {

  familles: any[] = [];
  search: string = '';
  filteredFamilles : any[] = [];

  constructor(private Familleservice: FamilleService) {}

  ngOnInit(): void {
    this.getFamilles(); 
  }

  getFamilles(): void {
    this.Familleservice.getFamilles().subscribe({
      next: (response) => {
        console.log(response)
        this.familles = response;
        this.onSearchChanges();
      },
      error: (error) => console.error(error)
    });
  }

  filterBySearch(famille: any): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      famille.id.toString().includes(searchLower) ||
      famille.name.toLowerCase().includes(searchLower) 
    );
  }

  
  onSearchChanges() {
    this.filteredFamilles = this.familles.filter(famille =>
      this.filterBySearch(famille) 
   
    );}


  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getFamilles();
  }

  deleteFamille(id: number) {
    this.Familleservice.deleteFamille(id).subscribe({
      next: () => {
        this.getFamilles(); 
      },
      error: (error) => console.log(error)
    });
  }

}
