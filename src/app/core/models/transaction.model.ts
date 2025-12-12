export interface Transaction {
  id: string;
  accountId: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
}
