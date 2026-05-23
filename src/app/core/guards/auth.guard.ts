import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * PHASE 1 STUB: the admin area is not built yet, so this guard always
 * redirects to the "coming soon" admin placeholder.
 *
 * PHASE 2: replace the body with a real check against the auth/session
 * service (JWT from the Next.js API) and return true/false accordingly.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // No authentication backend yet — send everyone to the placeholder.
  router.navigate(['/admin']);
  return false;
};
