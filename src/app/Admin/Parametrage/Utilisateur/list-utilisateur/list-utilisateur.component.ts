import { Component } from '@angular/core';
import { User } from '../../../../Models/user';
import { UserService } from '../../../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-utilisateur',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './list-utilisateur.component.html',
  styleUrl: './list-utilisateur.component.css'
})
export class ListUtilisateurComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  search: string = '';
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getall().subscribe({
      next: (response) => {
        this.users = response;
        this.onSearchChanges();
      },
      error: (error) => console.log(error)
    });
  }

  
  filterBySearch(user: User): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phoneNumber.toLowerCase().includes(searchLower)
    );
  }

  
  onSearchChanges() {
    this.filteredUsers = this.users.filter(user =>
      this.filterBySearch(user) 
  
    );}

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.getUsers(); 
      },
      error: (error) => console.log(error)
    });
  }

}
