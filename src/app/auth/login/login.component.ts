import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  password: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please check all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Pass username and password as two separate arguments
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Token is stored by auth service
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 
          error.error?.error || 
          error.error?.message || 
          'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}