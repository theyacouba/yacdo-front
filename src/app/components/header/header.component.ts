import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout().subscribe({
      next: (value) => {
        this.authService.removeToken();
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
