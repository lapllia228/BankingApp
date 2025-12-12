import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./feature/accounts/accounts.component').then(m => m.AccountsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'accounts/:id',
    loadComponent: () => import('./feature/transactions/transactions.component').then(m => m.TransactionsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'accounts/:id/transfer',
    loadComponent: () => import('./feature/transfer/transfer.component').then(m => m.TransferComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full'
  }
];
