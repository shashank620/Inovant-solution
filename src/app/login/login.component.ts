import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        phone: '',
        phoneCode: '965',
        password: this.loginForm.value.password,
        deviceToken: '',
        deviceType: '',
        deviceModel: '',
        appVersion: '',
        osVersion: '',
      };

      this.authService.login(payload).subscribe({
        next: (res) => {
          if (res.status === 1) {
            console.log('Login Success:', res);
            
            // Store user data in service
            this.authService.setUserData(res.data);
            
            // Navigate to register component
            this.router.navigate(['/register']);
          } else {
            alert(res.message || 'Login failed! User does not exist.');
          }
        },
        error: (err) => {
          console.error('Login Failed:', err);
          alert('Something went wrong! Please try again later.');
        },
      });
    }
  }

}
