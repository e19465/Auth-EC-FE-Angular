import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logOutUser();
  }
}
