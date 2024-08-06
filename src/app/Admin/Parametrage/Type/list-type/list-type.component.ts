import { Component, OnInit, Type } from '@angular/core';
import { TypeService } from '../../../../Services/type.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-type',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './list-type.component.html',
  styleUrl: './list-type.component.css'
})
export class ListTypeComponent implements OnInit {

  types: any[] = [];
  search = '';
  filteredTypes : any[] = [];

  constructor(private typeservice: TypeService) {}

  ngOnInit(): void {
    this.getTypes(); 
  }

  getTypes() {
    this.typeservice.getTypes().subscribe({
      next: (response) => {
        this.types = response;
        this.onSearchChanges();
      },
      error: (error) => console.log(error)
    });
  }

  filterBySearch(type : any): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      type.id.toString().includes(searchLower) ||
      type.name.toLowerCase().includes(searchLower) 
     
    );
  }

  
  onSearchChanges() {
    this.filteredTypes = this.types.filter(type =>
      this.filterBySearch(type) 
     
    );}

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getTypes();
  }

  deleteType(id: number) {
    this.typeservice.deleteType(id).subscribe({
      next: () => {
        this.ngOnInit(); 
      },
      error: (error) => console.log(error)
    });
  }
}
