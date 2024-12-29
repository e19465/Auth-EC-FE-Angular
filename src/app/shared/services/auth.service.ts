import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../constants/constants';
import { PlatformService } from './platform.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private platformService: PlatformService
  ) {}

  // ** Register the user ** //
  registerUser(formData: any) {
    return this.httpClient.post(this.baseUrl + '/user/sign-up', formData);
  }

  // ** Login the user ** //
  loginUser(formData: any) {
    return this.httpClient.post(this.baseUrl + '/user/sign-in', formData);
  }

  // ** Refresh tokens ** //
  refreshTokens() {
    return this.httpClient.post(this.baseUrl + '/user/refresh-jwt', {
      refreshToken: this.getRefreshToken(),
    });
  }

  // ** Send verification email ** //
  sendVerificationEmail(email: string) {
    return this.httpClient.post(
      this.baseUrl + '/user/send-verification-email',
      {
        email: email,
      }
    );
  }

  // ** Confirm email ** //
  confirmEmail(email: string, code: string) {
    return this.httpClient.post(this.baseUrl + '/user/confirm-email', {
      email: email,
      code: code,
    });
  }

  test(email: string, code: string) {
    return this.httpClient.post(this.baseUrl + '/user/test', {
      email: email,
      code: code,
    });
  }

  // ** Save tokens to local storage ** //
  saveTokensToLocalStorage(tokens: any) {
    if (this.platformService.isBrowser()) {
      if (tokens.accessToken) {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem(
          LocalStorageKeys.REFRESH_TOKEN,
          tokens.refreshToken
        );
      }
    }
  }

  // ** Get access token from local storage ** //
  getAccessToken() {
    if (this.platformService.isBrowser()) {
      return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || '';
    } else {
      return '';
    }
  }

  // ** Get refresh token from local storage ** //
  getRefreshToken() {
    if (this.platformService.isBrowser()) {
      return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN) || '';
    } else {
      return '';
    }
  }

  // ** Log out the user ** //
  logOutUser() {
    if (this.platformService.isBrowser()) {
      localStorage.clear();
    }
    this.router.navigateByUrl('/sign-in');
  }

  // ** Check if the user is logged in ** //
  isUserLoggedIn() {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }

  // ** Get the user claims ** //
  getUserClaims() {
    if (this.platformService.isBrowser()) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        const payload = accessToken.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
