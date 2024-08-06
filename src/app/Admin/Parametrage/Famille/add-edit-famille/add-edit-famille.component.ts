import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FamilleService } from '../../../../Services/famille.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { GroupeService } from '../../../../Services/groupe.service';
import { TextInputComponent } from '../../../../text-input/text-input.component';
@Component({
  selector: 'app-add-edit-famille',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './add-edit-famille.component.html',
  styleUrl: './add-edit-famille.component.css'
})
export class AddEditFamilleComponent implements OnInit {

  familleForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;
  groups: any[] = []; 
  groupID!: number;

  constructor(
    private fb: FormBuilder,
    private familleService: FamilleService,
    private groupservice: GroupeService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.familleForm = this.fb.group({
      name: ['', Validators.required],
      groupID: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadFamilleData();
      }
    });
    this.loadGroups(); 
  }

  loadFamilleData(): void {
    if (this.id) {
      this.familleService.getFamilleById(this.id).subscribe(famille => {
        this.familleForm.patchValue({
          name: famille.name,
          groupID: famille.groupId
        });
      });
    }
  }

  loadGroups(): void {
    this.groupservice.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  onSubmit(): void {
    if (this.familleForm.valid) {
      const familleData = this.familleForm.value;
      console.log(familleData)
      if (this.isEdit && this.id) {
        this.familleService.updateFamille(this.id, familleData).subscribe(
          () => this.router.navigate(['/Admin/Famille']),
          error => console.error('Error updating famille', error)
        );
      } else {
        this.familleService.addFamille(familleData).subscribe(
          () => this.router.navigate(['/Admin/Famille']),
          error => console.error('Error adding famille', error)
        );
      }
    }
  }
}