import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { budgets } from '../data/mockData';

export default function AddBudgetPage() {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add to mock data
    budgets.push({
      id: budgets.length + 1,
      category,
      limit: parseFloat(limit),
      spent: 0
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="h-8 w-8 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800">Set New Budget</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Limit ($)
              </label>
              <input
                // type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Set Budget
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}