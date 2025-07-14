import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  template: '<router-outlet></router-outlet>',
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  userData: any = null;
  activeMenuItem: string = 'edit';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.userData$.subscribe(data => {
      if (data) {
        this.userData = data;
        this.populateForm();
      }
    });

    const existingData = this.authService.getUserData();
    if (existingData) {
      this.userData = existingData;
      this.populateForm();
    }
  }

  populateForm() {
    if (this.userData) {
      this.registerForm.patchValue({
        firstName: this.userData.firstName || '',
        lastName: this.userData.lastName || '',
        email: this.userData.email || '',
        countryCode: this.userData.phoneCode || '',
        phone: this.userData.phone || ''
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      this.registerForm.reset();
    }
  }
  onMenuClick(event: Event, action: string) {
    event.preventDefault();

    this.activeMenuItem = action;

    switch (action) {
      case 'edit':
        this.populateForm();
        break;
      case 'faqs':
      case 'contact':
      case 'delete':
        this.clearForm();
        break;
      case 'logout':
        this.authService.setUserData(null);
        this.router.navigate(['/login']);
        break;
    }
  }

  clearForm() {
    this.registerForm.reset();
    this.registerForm.markAsUntouched();
    this.registerForm.markAsPristine();
  }
}