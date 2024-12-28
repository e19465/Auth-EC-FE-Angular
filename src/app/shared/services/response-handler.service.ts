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

  handleSuccessMassage(response: any, fallbackMessage: string | null = null) {
    if (response && response?.message) {
      this.toastr.success(response.message);
    } else if (fallbackMessage) {
      this.toastr.success(fallbackMessage);
    }
  }
}
