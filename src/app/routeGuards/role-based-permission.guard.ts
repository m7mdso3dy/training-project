// role-based-permission.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleBasedPermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['requiredRoles'] as string[]; // Extract required roles from route data

    // Your logic to check if the user has the required roles
    const hasPermission = this.checkRoleBasedPermission(requiredRoles);

    if (hasPermission) {
      return true; // Allow navigation
    } else {
      // Navigate to a different route or handle unauthorized access
      this.router.navigate(['/recipes']);
      return false; // Prevent navigation
    }
  }

  private checkRoleBasedPermission(requiredRoles: string[]): boolean {
    // Your logic to check if the user has the required roles
    // Implement the logic similar to what you have in appRoleBasedPermission
    const roles = localStorage.getItem('roles');
    const rolesArr: string[] = roles ? JSON.parse(roles) : [];
    return rolesArr.some((role) => requiredRoles.includes(role));
  }
}
