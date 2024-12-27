import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../layouts/auth-layout/auth-layout.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirstKeyPipe } from '../../../shared/pipes/first-key.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    FirstKeyPipe,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  imageSrc: string = '/images/loginbgsec.png';
  title: string = 'Sign Up';
  loading: boolean = false;
  isSubmitted: boolean = false;

  // ** Validate Between Password & Confirm Password ** //
  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  };

  // ** Custom Validator for Password Complexity ** //
  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) {
        return null; // Required validator will handle empty case
      }

      const errors: any = {};
      if (!/[A-Z]/.test(value)) {
        errors.uppercase =
          'Password must include at least one uppercase letter';
      }
      if (!/[a-z]/.test(value)) {
        errors.lowercase =
          'Password must include at least one lowercase letter';
      }
      if (!/[0-9]/.test(value)) {
        errors.number = 'Password must include at least one number';
      }
      if (!/[^a-zA-Z0-9]/.test(value)) {
        errors.specialCharacter =
          'Password must include at least one special character';
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  // ** Form Validation inside Constructor ** //
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group(
      {
        fullName: this.formBuilder.control('', Validators.required),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(6), // min 6 characters
          this.passwordComplexityValidator(), // custom validator for password complexity
        ]),
        confirmPassword: this.formBuilder.control('', [Validators.required]), // confirm password
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  //** Check for displayble error in register form  **//
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched))
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      alert('Please fill in all required fields');
    }
    this.toastr.success('Registration Successful');
  }
}
