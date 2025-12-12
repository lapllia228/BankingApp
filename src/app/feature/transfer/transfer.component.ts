import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Account } from '../../core/models/account.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  fromAccount: Account | undefined;
  otherAccounts: Account[] = [];
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.transferForm = this.fb.group({
      toAccountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      note: ['']
    });
  }

  get toAccountId() { return this.transferForm.get('toAccountId'); }
  get amount() { return this.transferForm.get('amount'); }

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    console.log(131231231313);
    if (!accountId) return;

    this.fromAccount = this.accountService.getAccountById(accountId);
    console.log(this.fromAccount);
    if (!this.fromAccount) return;

    this.accountService.getAccounts().subscribe(accounts => {
      console.log(accounts);
      this.otherAccounts = accounts.filter(acc => acc.id !== accountId);
    });

    // 3️⃣ Обновляем валидаторы для amount
    const validators = [
      Validators.required,
      Validators.min(0.01),
      Validators.max(this.fromAccount.balance)
    ];
    this.transferForm.get('amount')?.setValidators(validators);
    this.transferForm.get('amount')?.updateValueAndValidity();
  }

  // 4️⃣ Сабмит формы
  onSubmit(): void {
    if (!this.transferForm.valid || !this.fromAccount) return;

    const { toAccountId, amount, note } = this.transferForm.value;

    const amountNum = Number(amount); // Преобразуем к числу

    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Invalid amount');
      return;
    }

    const success = this.accountService.transfer(
      this.fromAccount.id,
      toAccountId,
      amountNum,
      note
    );

    if (success) {
      this.successMessage = 'Transfer completed successfully!';
      setTimeout(() => {
        this.router.navigate(['/accounts', this.fromAccount!.id]);
      }, 2000);
    } else {
      alert('Transfer failed: insufficient funds or invalid account');
    }
  }

  goBack(): void {
    if (this.fromAccount) {
      this.router.navigate(['/accounts', this.fromAccount.id]);
    }
  }
}
