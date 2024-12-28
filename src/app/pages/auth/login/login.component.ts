import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from '../../../layouts/auth-layout/auth-layout.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLayoutComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  imageSrc: string = '/images/loginpc.png';
  title: string = 'Sign In';
  loading: boolean = false;
  isSubmitted: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private responseHandlerService: ResponseHandlerService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  //** Initialize the component **//
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  //** Check for displayble error in register form  **//
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }

  //** Toggle password visibility **//
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  //** Submit the login form **//
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.toastr.error('Please fill all the required fields');
    }
    this.loading = true;
    this.authService.loginUser(this.form.value).subscribe({
      next: (response: any) => {
        this.responseHandlerService.handleSuccessMassage(
          response,
          'Login Successful'
        );
        this.authService.saveTokensToLocalStorage(response);
        this.loading = false;
        this.isSubmitted = false;
        this.form.reset();
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        this.responseHandlerService.handleError(error);
        this.loading = false;
      },
    });
  }
}
