import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {Account} from '../models/account.model';
import {Transaction} from '../models/transaction.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private mockAccounts: Account[] = [
    {
      id: '1',
      name: 'Checking Account',
      accountNumber: '****6789',
      balance: 2450.75,
      currency: '€'
    },
    {
      id: '2',
      name: 'Savings Account',
      accountNumber: '****1234',
      balance: 8920.50,
      currency: '€'
    },
    {
      id: '3',
      name: 'Investment Account',
      accountNumber: '****5678',
      balance: 15300.00,
      currency: '€'
    }
  ];

  private mockTransactions: Transaction[] = [
    { id: '1', accountId: '1', merchant: 'Grocery Store', category: 'Food', date: '2024-12-08', amount: -87.50 },
    { id: '2', accountId: '1', merchant: 'Electric Company', category: 'Bills', date: '2024-12-07', amount: -120.00 },
    { id: '3', accountId: '1', merchant: 'Salary Deposit', category: 'Income', date: '2024-12-05', amount: 3200.00 },
    { id: '4', accountId: '1', merchant: 'Coffee Shop', category: 'Food', date: '2024-12-04', amount: -5.50 },
    { id: '5', accountId: '1', merchant: 'Online Shopping', category: 'Shopping', date: '2024-12-03', amount: -156.30 },
    { id: '6', accountId: '1', merchant: 'Gas Station', category: 'Transport', date: '2024-12-02', amount: -45.00 },
    { id: '7', accountId: '1', merchant: 'Restaurant', category: 'Food', date: '2024-12-01', amount: -68.90 },
    { id: '8', accountId: '1', merchant: 'Gym Membership', category: 'Health', date: '2024-11-30', amount: -50.00 },
    { id: '9', accountId: '1', merchant: 'Pharmacy', category: 'Health', date: '2024-11-29', amount: -23.45 },
    { id: '10', accountId: '1', merchant: 'Bookstore', category: 'Shopping', date: '2024-11-28', amount: -42.00 },
    { id: '11', accountId: '1', merchant: 'Cinema', category: 'Entertainment', date: '2024-11-27', amount: -28.00 },
    { id: '12', accountId: '1', merchant: 'Freelance Payment', category: 'Income', date: '2024-11-26', amount: 500.00 },
    { id: '13', accountId: '2', merchant: 'Interest Payment', category: 'Income', date: '2024-12-01', amount: 12.50 },
    { id: '14', accountId: '2', merchant: 'Transfer from Checking', category: 'Transfer', date: '2024-11-15', amount: 1000.00 },
    { id: '15', accountId: '3', merchant: 'Stock Dividend', category: 'Income', date: '2024-12-06', amount: 234.50 },
    { id: '16', accountId: '3', merchant: 'Investment Purchase', category: 'Investment', date: '2024-11-20', amount: -5000.00 }
  ];

  constructor(private storageService: StorageService) {}

  getAccounts(): Observable<Account[]> {
    let accounts = this.storageService.getAccounts();

    if (!accounts || accounts.length === 0) {
      console.log('Using mock accounts');
      accounts = [...this.mockAccounts];
      this.storageService.setAccounts(accounts);
    }

    return of(accounts);
  }

  getAccountById(id: string): Account | undefined {
    const accounts = this.storageService.getAccounts() || this.mockAccounts;
    return accounts.find(acc => acc.id === id);
  }

  getTransactions(accountId?: string): Transaction[] {
    let transactions = this.storageService.getTransactions();
    if (!transactions) {
      transactions = this.mockTransactions;
      this.storageService.setTransactions(transactions);
    }
    return accountId
      ? transactions.filter(t => t.accountId === accountId)
      : transactions;
  }

  transfer(fromId: string, toId: string, amount: number, note: string): boolean {
    const accounts = this.storageService.getAccounts() || this.mockAccounts;
    const fromAccount = accounts.find(a => a.id === fromId);
    const toAccount = accounts.find(a => a.id === toId);

    if (!fromAccount || !toAccount) return false;
    if (fromAccount.balance < amount) return false;

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.storageService.setAccounts(accounts);

    const transactions = this.storageService.getTransactions() || this.mockTransactions;
    const newTransactions: Transaction[] = [
      {
        id: 'tx-' + Date.now() + '-1',
        accountId: fromId,
        merchant: `Transfer to ${toAccount.name}`,
        category: 'Transfer',
        date: new Date().toISOString().split('T')[0],
        amount: -amount
      },
      {
        id: 'tx-' + Date.now() + '-2',
        accountId: toId,
        merchant: `Transfer from ${fromAccount.name}`,
        category: 'Transfer',
        date: new Date().toISOString().split('T')[0],
        amount: amount
      }
    ];

    this.storageService.setTransactions([...newTransactions, ...transactions]);
    return true;
  }


}
