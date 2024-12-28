import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { HTTP_STATUS_CODES } from '../shared/constants/constants';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  let isRefreshing = false;
  let accessToken = authService.getAccessToken();

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return next(authRequest).pipe(
    catchError((error: any) => {
      if (error.status === HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED) {
        if (!isRefreshing && authService.isUserLoggedIn()) {
          isRefreshing = true;
          return authService.refreshTokens().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              if (!res.accessToken || !res.refreshToken) {
                throw new Error('Invalid response from server');
              }
              authService.saveTokensToLocalStorage(res);
              const newAccessToken = res.accessToken;

              const newAuthRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(newAuthRequest);
            }),
            catchError((refreshError: any) => {
              isRefreshing = false;
              authService.logOutUser();
              toastr.info('Please login again', 'Session Expired');
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
