import { Expense, Budget } from '../types';

export const expenses: Expense[] = [
  { id: 1, description: 'Groceries', amount: 150.50, category: 'Food', date: '2024-03-10' },
  { id: 2, description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-03-09' },
  { id: 3, description: 'Gas', amount: 45.00, category: 'Transportation', date: '2024-03-08' },
  { id: 4, description: 'Restaurant', amount: 85.00, category: 'Food', date: '2024-02-15' },
  { id: 5, description: 'Internet Bill', amount: 79.99, category: 'Utilities', date: '2024-02-10' },
  { id: 6, description: 'Movie Tickets', amount: 30.00, category: 'Entertainment', date: '2024-01-25' },
  { id: 7, description: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2024-01-15' },
  { id: 8, description: 'Groceries', amount: 200.00, category: 'Food', date: '2024-01-05' }
];

export const budgets: Budget[] = [
  { id: 1, category: 'Food', limit: 500, spent: 435.50 },
  { id: 2, category: 'Entertainment', limit: 200, spent: 45.99 },
  { id: 3, category: 'Transportation', limit: 300, spent: 45.00 },
  { id: 4, category: 'Utilities', limit: 400, spent: 199.99 }
];