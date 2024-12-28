import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { ResponseHandlerService } from '../../shared/services/response-handler.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  userFullName: string = '';
  loading: boolean = false;
  constructor(
    private accountService: AccountService,
    private responseHandlerService: ResponseHandlerService
  ) {}

  ngOnInit(): void {
    this.fetchUserAccountDetails();
  }

  fetchUserAccountDetails() {
    this.loading = true;
    this.accountService.getUserAccount().subscribe({
      next: (res: any) => {
        this.responseHandlerService.handleSuccessMassage(res);
        this.userFullName = res.fullName;
        this.loading = false;
      },
      error: (error: any) => {
        this.responseHandlerService.handleError(error);
        this.loading = false;
      },
    });
  }
}
