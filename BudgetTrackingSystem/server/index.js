import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import User from './models/User.js';
import Expense from './models/Expense.js';
import Budget from './models/Budget.js';
import jwt from 'jsonwebtoken';
import auth from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes
app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key');
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Expenses routes
app.get('/api/expenses', auth, async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.userId },
      order: [['date', 'DESC']]
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', auth, async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Budgets routes
app.get('/api/budgets', auth, async (req, res) => {
  try {
    const budgets = await Budget.findAll({
      where: { userId: req.userId }
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/budgets', auth, async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Initialize database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});