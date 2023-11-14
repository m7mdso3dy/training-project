import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isUserAuthed()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
