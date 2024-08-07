import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    });
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirmName');
  }

  onSubmitForm() {
    // this.userService.newUser(this.registerForm.value).subscribe({
    //   next(value) {
    //     console.log("Succesfull");
    //     this.router
    //   },
    //   error(err) {
    //     console.error(err);
    //   },
    // })

    this.userService.newUser(this.registerForm.value).pipe(
      tap(() => this.router.navigateByUrl('/login'))
    ).subscribe({
      error(err) {
        console.error(err);
      },
    });
  }

}
