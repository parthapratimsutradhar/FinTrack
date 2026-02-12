import React from 'react';
import SummaryCard from '../../dashboard/components/SummaryCard';

const FinancialSummary = ({ data, periodType }) => {
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(change)?.toFixed(2),
      isPositive: change >= 0
    };
  };

  const incomeTrend = calculateTrend(data?.totalIncome, data?.previousIncome);
  const expenseTrend = calculateTrend(data?.totalExpenses, data?.previousExpenses);
  const savingsTrend = data?.totalIncome && data?.totalExpenses 
    ? {
        percentage: Math.abs(data?.incomeChange || 0)?.toFixed(2),
        isPositive: data?.savings > 0
      }
    : null;

  return (
    <div>
      <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
        {periodType === 'monthly' ? 'Monthly' : 'Yearly'} Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard
          title="Total Income"
          amount={data?.totalIncome || 0}
          type="income"
          icon="TrendingUp"
          trend={incomeTrend}
        />
        <SummaryCard
          title="Total Expenses"
          amount={data?.totalExpenses || 0}
          type="expense"
          icon="TrendingDown"
          trend={expenseTrend}
        />
        <SummaryCard
          title="Savings"
          amount={data?.savings || 0}
          type="balance"
          icon="Wallet"
          trend={savingsTrend}
        />
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial hover:shadow-financial-md transition-smooth border border-border">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Spending Variance</p>
            <p className={`text-2xl md:text-3xl lg:text-4xl font-heading font-bold ${
              data?.variance < 0 ? 'text-success' : 'text-error'
            }`}>
              {data?.variance > 0 ? '+' : ''}{data?.variance?.toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              vs previous {periodType === 'monthly' ? 'month' : 'year'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;