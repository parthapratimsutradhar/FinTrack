import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import AddTransactionModal from '../../components/ui/AddTransactionModal';
import SummaryCard from './components/SummaryCard';
import MonthlyExpenseChart from './components/MonthlyExpenseChart';
import CategoryPieChart from './components/CategoryPieChart';
import RecentTransactions from './components/RecentTransactions';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [user] = useState({
    name: 'John Anderson',
    email: 'john.anderson@example.com'
  });

  useEffect(() => {
    const mockTransactions = [
      {
        id: 1,
        title: 'Grocery Shopping',
        amount: 156.75,
        category: 'Food',
        type: 'expense',
        date: '2026-02-11',
        description: 'Weekly groceries from Whole Foods'
      },
      {
        id: 2,
        title: 'Monthly Salary',
        amount: 5000.00,
        category: 'Other',
        type: 'income',
        date: '2026-02-10',
        description: 'February salary payment'
      },
      {
        id: 3,
        title: 'Uber Ride',
        amount: 24.50,
        category: 'Travel',
        type: 'expense',
        date: '2026-02-10',
        description: 'Ride to downtown office'
      },
      {
        id: 4,
        title: 'Netflix Subscription',
        amount: 15.99,
        category: 'Other',
        type: 'expense',
        date: '2026-02-09',
        description: 'Monthly streaming subscription'
      },
      {
        id: 5,
        title: 'Freelance Project',
        amount: 850.00,
        category: 'Other',
        type: 'income',
        date: '2026-02-08',
        description: 'Web design project payment'
      },
      {
        id: 6,
        title: 'Rent Payment',
        amount: 1200.00,
        category: 'Rent',
        type: 'expense',
        date: '2026-02-05',
        description: 'February rent for apartment'
      },
      {
        id: 7,
        title: 'Gym Membership',
        amount: 45.00,
        category: 'Health',
        type: 'expense',
        date: '2026-02-04',
        description: 'Monthly fitness center membership'
      },
      {
        id: 8,
        title: 'Online Shopping',
        amount: 89.99,
        category: 'Shopping',
        type: 'expense',
        date: '2026-02-03',
        description: 'Electronics accessories from Amazon'
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  const monthlyData = [
    { month: 'Aug', income: 4500, expenses: 3200 },
    { month: 'Sep', income: 5200, expenses: 3800 },
    { month: 'Oct', income: 4800, expenses: 3500 },
    { month: 'Nov', income: 5500, expenses: 4200 },
    { month: 'Dec', income: 6000, expenses: 4800 },
    { month: 'Jan', income: 5800, expenses: 4100 },
    { month: 'Feb', income: 5850, expenses: 1532.23 }
  ];

  const categoryData = [
    { name: 'Food', value: 156.75, percentage: 10.2 },
    { name: 'Rent', value: 1200.00, percentage: 78.3 },
    { name: 'Travel', value: 24.50, percentage: 1.6 },
    { name: 'Shopping', value: 89.99, percentage: 5.9 },
    { name: 'Health', value: 45.00, percentage: 2.9 },
    { name: 'Other', value: 15.99, percentage: 1.1 }
  ];

  const calculateTotalIncome = () => {
    return transactions?.filter(t => t?.type === 'income')?.reduce((sum, t) => sum + t?.amount, 0);
  };

  const calculateTotalExpenses = () => {
    return transactions?.filter(t => t?.type === 'expense')?.reduce((sum, t) => sum + t?.amount, 0);
  };

  const calculateBalance = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const recentTransactions = transactions?.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar user={user} onLogout={handleLogout} />
      <main className="pt-nav pb-20 md:pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Financial Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Welcome back, {user?.name}! Here's your financial overview for February 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <SummaryCard
              title="Total Income"
              amount={calculateTotalIncome()}
              type="income"
              icon="TrendingUp"
              trend={{ isPositive: true, percentage: 12.5 }}
            />
            <SummaryCard
              title="Total Expenses"
              amount={calculateTotalExpenses()}
              type="expense"
              icon="TrendingDown"
              trend={{ isPositive: false, percentage: 8.3 }}
            />
            <SummaryCard
              title="Current Balance"
              amount={calculateBalance()}
              type="balance"
              icon="Wallet"
              trend={{ isPositive: true, percentage: 0 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <MonthlyExpenseChart data={monthlyData} />
            <CategoryPieChart data={categoryData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <RecentTransactions transactions={recentTransactions} />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
    
  );
};

export default Dashboard;
