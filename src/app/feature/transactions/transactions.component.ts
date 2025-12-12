import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {Account} from '../../core/models/account.model';
import {Transaction} from '../../core/models/transaction.model';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  account: Account | undefined;
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  paginatedTransactions: Transaction[] = [];

  searchTerm = '';
  filterType: 'all' | 'debit' | 'credit' = 'all';
  sortNewest = true;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.account = this.accountService.getAccountById(accountId);
      this.transactions = this.accountService.getTransactions(accountId);
      this.applyFilters();
    }
  }

  applyFilters(): void {
    let filtered = [...this.transactions];

    if (this.searchTerm) {
      filtered = filtered.filter(tx =>
        tx.merchant.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType === 'debit') {
      filtered = filtered.filter(tx => tx.amount < 0);
    } else if (this.filterType === 'credit') {
      filtered = filtered.filter(tx => tx.amount > 0);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortNewest ? dateB - dateA : dateA - dateB;
    });

    this.filteredTransactions = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTransactions = this.filteredTransactions.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  toggleSort(): void {
    this.sortNewest = !this.sortNewest;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }

  goToTransfer(): void {
    if (this.account) {
      this.router.navigate(['/accounts', this.account.id, 'transfer']);
    }
  }
}
