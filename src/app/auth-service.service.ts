import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  private isAuthed: boolean = false;
  userId: string = '';
  logIn(userCreds: UserCreds): Observable<boolean> {
    return this.http
      .post<loginResponseInterface>('http://localhost:3000/login', {
        userCreds,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          return true;
        })
      );
  }
  logOut() {
    this.isAuthed = false;
  }
  isUserAuthed(): boolean {
    return this.isAuthed;
  }
}

export interface UserCreds {
  email: string;
  password: string;
}

export interface loginResponseInterface {
  token: string;
}
