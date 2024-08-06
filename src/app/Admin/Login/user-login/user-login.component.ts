import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../text-input/text-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [TextInputComponent, FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const token = this.loginService.getToken();
    if (token) {
      this.loginService.loadCurrentUser(token).subscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigateByUrl("/Admin"),
        error: err => console.error('Login failed', err) 
      });
    }
  }
}
