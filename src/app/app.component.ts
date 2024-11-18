import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recipe-app';

  constructor(private location: Location, private authService: AuthService) {}
  goBack(): void {
    this.location.back();
  }

  logIn(): void {
    this.authService.logIn();
  }

  logOut(): void {
    this.authService.logOut();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
