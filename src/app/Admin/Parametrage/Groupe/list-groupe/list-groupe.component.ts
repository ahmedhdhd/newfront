import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../../../../Services/groupe.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-groupe',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './list-groupe.component.html',
  styleUrl: './list-groupe.component.css'
})
export class ListGroupeComponent implements OnInit {

  groups: any[] = [];
  filteredGroups: any[] = [];
  search: string = '';

  constructor(private groupService: GroupeService) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getall().subscribe(
      groups => {
        this.groups = groups;
        this.filteredGroups = groups;
      },
      error => console.error('Error loading groups', error)
    );
  }

  onSearchChanges(): void {
    if (this.search) {
      this.filteredGroups = this.groups.filter(group => group.name.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredGroups = this.groups;
    }
  }

  deleteGroup(id: number): void {
    
      this.groupService.delete(id).subscribe(
        () => this.filteredGroups = this.filteredGroups.filter(group => group.id !== id),
        error => console.error('Error deleting group', error)
      );
      this.loadGroups()
  }}