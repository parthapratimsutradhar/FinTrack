import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import FinancialSummary from './components/FinancialSummary';
import SpendingTrendChart from './components/SpendingTrendChart';
import CategoryAnalysis from './components/CategoryAnalysis';
import BudgetComparison from './components/BudgetComparison';
import ExportControls from './components/ExportControls';
import Icon from '../../components/AppIcon';

const Reports = () => {
  const navigate = useNavigate();
  const [periodType, setPeriodType] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(2);
  const [user] = useState({
    name: 'John Anderson',
    email: 'john.anderson@example.com'
  });

  const [reportData, setReportData] = useState({
    summary: {},
    trends: [],
    categories: [],
    budgetComparison: []
  });

  useEffect(() => {
    generateReportData();
  }, [periodType, selectedYear, selectedMonth]);

  const generateReportData = () => {
    if (periodType === 'monthly') {
      setReportData({
        summary: {
          totalIncome: 5850.00,
          totalExpenses: 1532.23,
          savings: 4317.77,
          variance: -12.5,
          previousIncome: 5800.00,
          previousExpenses: 4100.00,
          incomeChange: 0.86,
          expenseChange: -62.63
        },
        trends: [
          { period: 'Week 1', income: 850, expenses: 245, savings: 605 },
          { period: 'Week 2', income: 1200, expenses: 380, savings: 820 },
          { period: 'Week 3', income: 1500, expenses: 425, savings: 1075 },
          { period: 'Week 4', income: 2300, expenses: 482, savings: 1818 }
        ],
        categories: [
          { name: 'Food', value: 156.75, percentage: 10.2, budget: 300, spent: 156.75 },
          { name: 'Rent', value: 1200.00, percentage: 78.3, budget: 1200, spent: 1200.00 },
          { name: 'Travel', value: 24.50, percentage: 1.6, budget: 200, spent: 24.50 },
          { name: 'Shopping', value: 89.99, percentage: 5.9, budget: 150, spent: 89.99 },
          { name: 'Health', value: 45.00, percentage: 2.9, budget: 100, spent: 45.00 },
          { name: 'Other', value: 15.99, percentage: 1.1, budget: 50, spent: 15.99 }
        ],
        budgetComparison: [
          { category: 'Food', budget: 300, actual: 156.75, variance: -47.75 },
          { category: 'Rent', budget: 1200, actual: 1200.00, variance: 0 },
          { category: 'Travel', budget: 200, actual: 24.50, variance: -87.75 },
          { category: 'Shopping', budget: 150, actual: 89.99, variance: -40.01 },
          { category: 'Health', budget: 100, actual: 45.00, variance: -55.00 },
          { category: 'Other', budget: 50, actual: 15.99, variance: -68.02 }
        ]
      });
    } else {
      setReportData({
        summary: {
          totalIncome: 63650.00,
          totalExpenses: 43132.23,
          savings: 20517.77,
          variance: 8.3,
          previousIncome: 58800.00,
          previousExpenses: 41000.00,
          incomeChange: 8.25,
          expenseChange: 5.20
        },
        trends: [
          { period: 'Jan', income: 5800, expenses: 4100, savings: 1700 },
          { period: 'Feb', income: 5850, expenses: 1532, savings: 4318 },
          { period: 'Mar', income: 5200, expenses: 3800, savings: 1400 },
          { period: 'Apr', income: 4800, expenses: 3500, savings: 1300 },
          { period: 'May', income: 5500, expenses: 4200, savings: 1300 },
          { period: 'Jun', income: 6000, expenses: 4800, savings: 1200 },
          { period: 'Jul', income: 5300, expenses: 3900, savings: 1400 },
          { period: 'Aug', income: 4500, expenses: 3200, savings: 1300 },
          { period: 'Sep', income: 5200, expenses: 3800, savings: 1400 },
          { period: 'Oct', income: 4800, expenses: 3500, savings: 1300 },
          { period: 'Nov', income: 5500, expenses: 4200, savings: 1300 },
          { period: 'Dec', income: 5200, expenses: 2600, savings: 2600 }
        ],
        categories: [
          { name: 'Food', value: 4320.50, percentage: 10.0, budget: 3600, spent: 4320.50 },
          { name: 'Rent', value: 14400.00, percentage: 33.4, budget: 14400, spent: 14400.00 },
          { name: 'Travel', value: 3250.00, percentage: 7.5, budget: 2400, spent: 3250.00 },
          { name: 'Shopping', value: 8950.00, percentage: 20.7, budget: 1800, spent: 8950.00 },
          { name: 'Health', value: 5400.00, percentage: 12.5, budget: 1200, spent: 5400.00 },
          { name: 'Other', value: 6811.73, percentage: 15.8, budget: 600, spent: 6811.73 }
        ],
        budgetComparison: [
          { category: 'Food', budget: 3600, actual: 4320.50, variance: 20.01 },
          { category: 'Rent', budget: 14400, actual: 14400.00, variance: 0 },
          { category: 'Travel', budget: 2400, actual: 3250.00, variance: 35.42 },
          { category: 'Shopping', budget: 1800, actual: 8950.00, variance: 397.22 },
          { category: 'Health', budget: 1200, actual: 5400.00, variance: 350.00 },
          { category: 'Other', budget: 600, actual: 6811.73, variance: 1035.29 }
        ]
      });
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = [2024, 2025, 2026];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Financial Reports
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Comprehensive analytics and insights for better financial decisions
              </p>
            </div>
            
            {/* Period Selector */}
            <div className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1">
              <button
                onClick={() => setPeriodType('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  periodType === 'monthly' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Calendar" size={16} className="inline mr-2" />
                Monthly
              </button>
              <button
                onClick={() => setPeriodType('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  periodType === 'yearly' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="CalendarDays" size={16} className="inline mr-2" />
                Yearly
              </button>
            </div>
          </div>

          {/* Date Range Controls */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {periodType === 'monthly' && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-muted-foreground">Month:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e?.target?.value))}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {months?.map((month) => (
                    <option key={month?.value} value={month?.value}>
                      {month?.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e?.target?.value))}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {years?.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <FinancialSummary data={reportData?.summary} periodType={periodType} />

        {/* Spending Trends */}
        <div className="mt-6 md:mt-8">
          <SpendingTrendChart data={reportData?.trends} periodType={periodType} />
        </div>

        {/* Category Analysis & Budget Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
          <CategoryAnalysis data={reportData?.categories} />
          <BudgetComparison data={reportData?.budgetComparison} />
        </div>

        {/* Export Controls */}
        <div className="mt-6 md:mt-8">
          <ExportControls 
            periodType={periodType}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            reportData={reportData}
          />
        </div>
      </main>
    </div>
  );
};

export default Reports;