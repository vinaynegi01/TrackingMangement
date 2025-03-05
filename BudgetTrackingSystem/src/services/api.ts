import { Expense, Budget } from '../types';
import { expenses, budgets } from '../data/mockData';

export const login = async (email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === 'demo@example.com' && password === 'password') {
    const token = 'dummy-token';
    localStorage.setItem('token', token);
    return { token };
  }
  throw new Error('Invalid credentials');
};

export const getExpenses = async (): Promise<Expense[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return expenses;
};

export const getBudgets = async (): Promise<Budget[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return budgets;
};