import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, CreditCard, TrendingUp, Wallet, PlusCircle } from 'lucide-react';
import { getExpenses, getBudgets } from '../services/api';
import { Expense, Budget } from '../types';
import { Button, Modal } from '@mantine/core';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, budgetsData] = await Promise.all([
          getExpenses(),
          getBudgets()
        ]);
        setExpenses(expensesData);
        setBudgets(budgetsData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  console.log('KKKKK', totalExpenses);
  console.log('LLLLL', totalBudget);
  // Group expenses by month and calculate total for each month
  const monthlySpending = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleString('default', { month: 'short' });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        amount: 0,
        monthKey // Keep the key for sorting
      };
    }
    acc[monthKey].amount += expense.amount;
    return acc;
  }, {} as Record<string, { month: string; amount: number; monthKey: string }>);

  // Convert to array and sort by month
  const monthlyData = Object.values(monthlySpending)
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey));

  // Calculate monthly trend (percentage change)
  const monthlyTrend = monthlyData.length >= 2
    ? ((monthlyData[monthlyData.length - 1].amount - monthlyData[monthlyData.length - 2].amount) /
      monthlyData[monthlyData.length - 2].amount * 100)
    : 0;

  // Calculate spent amount for each budget category
  const budgetsWithSpent = budgets.map(budget => {
    const spent = expenses
      .filter(expense => expense.category === budget.category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { ...budget, spent };
  });

  console.log('Budgetttt',budgetsWithSpent);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/add-expense')}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              Add Expense
            </button>
            <button
              onClick={() => navigate('/add-budget')}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              <Wallet className="h-5 w-5" />
              Set Budget
            </button>
            <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Logout"
        centered
      >
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              setOpened(false);
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </div>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
      >
        <Wallet className="h-5 w-5" />
        Log-out
      </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toFixed(2)}`}
            icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Total Budget"
            value={`$${totalBudget.toFixed(2)}`}
            icon={<Wallet className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Remaining Budget"
            value={`$${(totalBudget - totalExpenses).toFixed(2)}`}
            icon={<CreditCard className="h-6 w-6 text-purple-500" />}
          />
          <StatCard
            title="Monthly Trend"
            value={`${monthlyTrend.toFixed(1)}%`}
            icon={<TrendingUp className="h-6 w-6 text-orange-500" />}
          />
        </div>

        {/* Charts */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Spending Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Budget vs Spending</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetsWithSpent}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="limit" fill="#3b82f6" name="Budget" />
                  <Bar dataKey="spent" fill="#ef4444" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div> */}

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${expense.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}