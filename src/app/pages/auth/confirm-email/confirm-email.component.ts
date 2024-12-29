import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  templateUrl: './confirm-email.component.html',
  imports: [CommonModule, RouterLink],
})
export class ConfirmEmailComponent implements OnInit {
  email: string | null = null;
  code: string | null = null;
  loading: boolean = false;
  gifSrc: string = '/images/loading.gif';
  success: boolean = false;
  failed: boolean = false;
  invaliadLink: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private responseHandlerService: ResponseHandlerService
  ) {}

  //** Initialize the component **//
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.route.queryParamMap.subscribe((params) => {
        this.email = params.get('email') || '';
        this.code = params.get('code') || '';

        if (!this.email && !this.code) {
          this.invaliadLink = true;
        }
      });
    }
  }

  //** Confirm email **//
  confirmEmailUser(email: string | null, code: string | null) {
    if (!email || !code) {
      this.invaliadLink = true;
      return;
    }
    this.loading = true;
    this.failed = false;
    this.success = false;
    this.invaliadLink = false;
    this.authService.confirmEmail(email, code).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.failed = false;
        this.success = true;
        this.responseHandlerService.handleSuccessMassage(
          res,
          'Email confirmed successfully'
        );
      },
      error: (err: any) => {
        this.loading = false;
        this.failed = true;
        this.responseHandlerService.handleError(err);
      },
    });
  }
}
