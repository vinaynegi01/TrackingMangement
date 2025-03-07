import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  CreditCard,
  Wallet,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { deleteExpense, expenseUser, financelDashBoard } from "../data/Api";
import { Button, Modal } from "@mantine/core";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalexpenses,setTotalexpenses] = useState(0);
  const [totalbudget,setBudget] = useState();
  const [remainingblance,Setremaingblance]= useState();
  const [isLoading, setIsLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");
  const [refresh,setRefresh] = useState(false)
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await expenseUser(localStorage.getItem("userId"));
        setExpenses(res.data.data);
        const Res:any = await financelDashBoard(localStorage.getItem("userId"))
        
        setTotalexpenses(Res.data.data.totalExpense)
        setBudget(Res.data.data.Budget)
        Setremaingblance(Res.data.data.RemainingBalance)
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refresh]);
  
  const handleDelete = async (id:any) => {
        try {
    const res:any =  await deleteExpense(id);
    console.log(res);
    setRefresh(true)
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Financial Dashboard
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/add-expense")}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              Add Expense
            </button>
            <button
              onClick={() => navigate("/add-budget")}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              <Wallet className="h-5 w-5" />
              Set Budget
            </button>
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              <Wallet className="h-5 w-5" />
              Log-out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={totalexpenses.toString()}
            icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Total Budget"
            value={totalbudget.toString()}
            icon={<Wallet className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Remaining Budget"
            value={remainingblance.toString()}
            icon={<CreditCard className="h-6 w-6 text-purple-500" />}
          />
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recent Expenses
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses?.map((expense: any) => (
                  <tr key={expense.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {expense.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-3">
                      {/* Edit Button */}
                      <button
                        onClick={() => navigate(`/edit-expense/${expense.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={()=>handleDelete(expense.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
{/* 
        <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Delete" centered>
  <p>Are you sure you want to delete this record?</p>
  <div className="flex justify-end gap-3 mt-4">
    <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
      Cancel
    </Button>
    <Button color="red" onClick={handleDelete}>
      Yes, Delete
    </Button>
  </div>
</Modal> */}

        {/* Logout Modal */}
        <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Logout" centered>
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
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      {icon}
    </div>
  );
}
