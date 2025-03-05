export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface Budget {
  id: number;
  category: string;
  limit: number;
  spent: number;
}