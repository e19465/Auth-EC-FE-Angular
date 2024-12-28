import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    const claimReq = route.data['claimReq'] as Function;
    if (claimReq) {
      const userClaims = authService.getUserClaims();
      if (!userClaims) {
        router.navigateByUrl('/forbidden');
        return false;
      } else {
        if (claimReq(userClaims)) {
          return true;
        } else {
          router.navigateByUrl('/forbidden');
          return false;
        }
      }
    } else {
      return true;
    }
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};
