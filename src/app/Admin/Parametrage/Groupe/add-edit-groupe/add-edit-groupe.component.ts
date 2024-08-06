import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { GroupeService } from '../../../../Services/groupe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TextInputComponent } from "../../../../text-input/text-input.component";

@Component({
  selector: 'app-add-edit-groupe',
  standalone: true,
  imports: [TextInputComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './add-edit-groupe.component.html',
  styleUrl: './add-edit-groupe.component.css'
})
export class AddEditGroupeComponent implements OnInit {

  groupForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadGroupData();
      }
    });
  }

  loadGroupData(): void {
    if (this.id) {
      this.groupService.getGroupById(this.id).subscribe(group => {
        this.groupForm.patchValue({
          name: group.name,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData = this.groupForm.value;
      if (this.isEdit && this.id) {
        this.groupService.update(this.id, groupData).subscribe(
          () => this.router.navigate(['/Admin/Groupe']),
          error => console.error('Error updating group', error)
        );
      } else {
        this.groupService.add(groupData).subscribe(
          () => this.router.navigate(['/Admin/Groupe']),
          error => console.error('Error adding group', error)
        );
      }
    }
  }
}
