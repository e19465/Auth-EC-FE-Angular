import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from '../../../layouts/auth-layout/auth-layout.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';

@Component({
  selector: 'app-send-verification-email',
  standalone: true,
  imports: [AuthLayoutComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './send-verification-email.component.html',
})
export class SendVerificationEmailComponent implements OnInit {
  imageSrc: string = '/images/verification_email.webp';
  title: string = 'Send Verification Email';
  form: FormGroup;
  loading: boolean = false;
  isSubmitted: boolean = false;
  success: boolean = false;
  failed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private responseHandlerService: ResponseHandlerService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  //** Initialize the component **//
  ngOnInit(): void {
    //** Redirect to home if user is already logged in **//
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  //** Check for displayble error in email send form  **//
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.failed = false;
    this.success = false;

    this.authService.sendVerificationEmail(this.form.value.email).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.isSubmitted = false;
        this.success = true;
        this.responseHandlerService.handleSuccessMassage(
          res,
          'Verification email sent successfully'
        );
      },
      error: (err: any) => {
        this.loading = false;
        this.failed = true;
        this.isSubmitted = false;
        this.responseHandlerService.handleError(err);
      },
    });
  }
}
