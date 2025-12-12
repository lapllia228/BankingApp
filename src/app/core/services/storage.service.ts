import { Injectable } from '@angular/core';
import {Account} from '../models/account.model';
import {Transaction} from '../models/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TOKEN_KEY = 'mock-token';
  private readonly ACCOUNTS_KEY = 'accounts';
  private readonly TRANSACTIONS_KEY = 'transactions';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getAccounts(): Account[] | null {
    const data = localStorage.getItem(this.ACCOUNTS_KEY);
    return data ? JSON.parse(data) : null;
  }

  setAccounts(accounts: Account[]): void {
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  getTransactions(): Transaction[] | null {
    const data = localStorage.getItem(this.TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : null;
  }

  setTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(transactions));
  }
}
