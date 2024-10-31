import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminCredentials = { username: 'admin', password: 'password' };
  public isLoggedIn = true; 

  login(username: string, password: string): boolean {
    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}