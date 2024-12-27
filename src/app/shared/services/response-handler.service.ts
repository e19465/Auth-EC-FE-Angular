import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor(private toastr: ToastrService) {}

  handleError(error: any) {
    if (error && error?.error?.detail) {
      this.toastr.error(error.error.detail);
    }
    console.error('Error occurred while processing request', error);
  }

  handleSuccessMassage(response: any, fallbackMessage: string) {
    if (response && response?.message) {
      this.toastr.success(response.message);
    } else {
      this.toastr.success(fallbackMessage);
    }
  }
}
