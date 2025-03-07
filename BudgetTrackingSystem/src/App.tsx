import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AddExpensePage from './components/AddExpensePage';
import AddBudgetPage from './components/AddBudgetPage';
import RegisterPage from './components/RegisterPage';
import EditExpenses from './components/EditExpenses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpensePage />} />
        <Route path="/add-budget" element={<AddBudgetPage />} />
        <Route path="/register" element={< RegisterPage/>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/edit-expense/:id" element={< EditExpenses/>} />
      </Routes>
    </Router>
  );
}

export default App;