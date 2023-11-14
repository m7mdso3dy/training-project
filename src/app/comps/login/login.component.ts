import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  get activateSubmitValue(): boolean {
    return !(Boolean(this.email) && Boolean(this.password));
  }

  onSubmitLoginForm() {
    this.isLoading = true;
    this.authService
      .logIn({ email: this.email, password: this.password })
      .subscribe({
        next: (status) => {
          if (status) {
            this.router.navigate(['/recipes']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
}
