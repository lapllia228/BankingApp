import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Account } from '../../core/models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;

    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
        this.loading = false;
      }
    });
  }

  selectAccount(id: string): void {
    this.router.navigate(['/accounts', id]);
  }
}
