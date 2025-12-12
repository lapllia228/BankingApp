import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_EMAIL = 'test@bank.com';
  private readonly VALID_PASSWORD = '123456';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  login(email: string, password: string): boolean {
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      const token = 'mock-token-' + Date.now();
      this.storageService.setToken(token);
      return true;
    }
    return false;
  }

  logout(): void {
    this.storageService.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getToken();
  }
}
