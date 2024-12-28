import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://localhost:7102/api';
  constructor(private httpClient: HttpClient) {}

  // ** Get User Account Details ** //
  getUserAccount() {
    return this.httpClient.get(this.baseUrl + '/account/details');
  }
}
