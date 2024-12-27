import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7102/api';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // ** Register the user ** //
  registerUser(formData: any) {
    return this.httpClient.post(this.baseUrl + '/user/sign-up', formData);
  }

  // ** Login the user ** //
  loginUser(formData: any) {
    return this.httpClient.post(this.baseUrl + '/user/sign-in', formData);
  }

  // ** Save tokens to local storage ** //
  saveTokensToLocalStorage(tokens: any) {
    if (tokens.accessToken) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, tokens.accessToken);
    }
    if (tokens.refreshToken) {
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, tokens.refreshToken);
    }
  }

  // ** Get access token from local storage ** //
  getAccessToken() {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || '';
  }

  // ** Get refresh token from local storage ** //
  getRefreshToken() {
    return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN) || '';
  }

  // ** Log out the user ** //
  logOutUser() {
    localStorage.clear();
    this.router.navigateByUrl('/sign-in');
  }
}
