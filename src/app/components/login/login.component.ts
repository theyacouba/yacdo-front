import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { AuthUtils } from '../../core/utils/auth.utils';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  onSubmitLoginForm() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (value) => {
        this.authService.saveToken(value.token);
        this.router.navigateByUrl(`/todo-list`);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
