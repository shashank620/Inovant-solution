import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  // },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
  // },
  // { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },
];