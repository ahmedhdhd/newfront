import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../../../Services/type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilleService } from '../../../../Services/famille.service';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../../text-input/text-input.component';

@Component({
  selector: 'app-add-edit-type',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './add-edit-type.component.html',
  styleUrl: './add-edit-type.component.css'
})
export class AddEditTypeComponent implements OnInit {

  typeForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;
  familles: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private FamilleService: FamilleService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      familleId: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadTypeData();
      }
    });
    this.loadFamilles();
  }

  loadTypeData(): void {
    if (this.id) {
      this.typeService.getTypeById(this.id).subscribe(type => {
        this.typeForm.patchValue({
          name: type.name,
          familleId: type.familleId
        });
      });
    }
  }

  loadFamilles(): void {
    this.FamilleService.getall().subscribe(familles => {
      this.familles = familles;
    });
  }

  onSubmit(): void {
    if (this.typeForm.valid) {
      const typeData = this.typeForm.value;
      if (this.isEdit && this.id) {
        this.typeService.update(this.id, typeData).subscribe(
          () => this.router.navigate(['/Admin/Type']),
          error => console.error('Error updating type', error)
        );
      } else {
        this.typeService.add(typeData).subscribe(
          () => this.router.navigate(['/Admin/Type']),
          error => console.error('Error adding type', error)
        );
      }
    }
  }
}

