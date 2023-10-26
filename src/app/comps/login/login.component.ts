import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(authService: AuthServiceService) {}
  email: string = '';
  password: string = '';

  onSubmitLoginForm() {}
}
