import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  // ** Get User Account Details ** //
  getUserAccount() {
    return this.httpClient.get(this.baseUrl + '/account/details');
  }
}
