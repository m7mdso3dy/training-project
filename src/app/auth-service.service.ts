import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor() {}
  private isAuthed: boolean = false;
  userId: string = '';
  logIn(userCreds: UserCreds) {
    /**
     * request to check creds and return with the user Id for storing
     */
    this.isAuthed = true;
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
