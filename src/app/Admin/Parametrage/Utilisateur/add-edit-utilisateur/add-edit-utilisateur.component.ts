import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextInputComponent } from "../../../../text-input/text-input.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-utilisateur',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './add-edit-utilisateur.component.html',
  styleUrl: './add-edit-utilisateur.component.css'
})
export class AddEditUtilisateurComponent{
userForm: FormGroup;
isEdit: boolean = false;
id: number | null = null;

constructor(
  private fb: FormBuilder,
  private userService: UserService,
  private router: Router,
  private route: ActivatedRoute
) {
  this.userForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.id = Number(params.get('id')); 
    if (this.id) {
      this.isEdit = true;
      this.loadUserData();
    }
  });
}

loadUserData(): void {
  if (this.id) {
    this.userService.getUserById(this.id).subscribe(user => {
      this.userForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      });
    });
  }
}

onSubmit(): void {
  if (this.userForm.valid) {
    const userData = this.userForm.value;
    if (this.isEdit && this.id) {
      this.userService.update(this.id, userData).subscribe(
        () => this.router.navigate(['/Admin/User']),
        error => console.error('Error updating user', error)
      );
    } else {
      this.userService.add(userData).subscribe(
        () => this.router.navigate(['/Admin/User']),
        error => console.error('Error adding user', error)
      );
    }
  }
}

}