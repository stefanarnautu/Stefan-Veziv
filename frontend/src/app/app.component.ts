import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl:'app.component.html',
  styleUrls:['app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private router:Router) {}
  
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}