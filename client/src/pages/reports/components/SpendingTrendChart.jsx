import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendingTrendChart = ({ data, periodType }) => {
  const [chartType, setChartType] = useState('line');
  const [activeMetrics, setActiveMetrics] = useState({
    income: true,
    expenses: true,
    savings: true
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-financial-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          <div className="space-y-1">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry?.color }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{entry?.name}:</span>
                </div>
                <span className="text-sm font-medium text-popover-foreground">
                  ${entry?.value?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const toggleMetric = (metric) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metric]: !prev?.[metric]
    }));
  };

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
            Spending Trends
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {periodType === 'monthly' ? 'Weekly' : 'Monthly'} breakdown of income, expenses, and savings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition-smooth ${
              chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="Line chart view"
          >
            <Icon name="LineChart" size={16} />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition-smooth ${
              chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="Bar chart view"
          >
            <Icon name="BarChart3" size={16} />
          </button>
        </div>
      </div>

      {/* Metric Toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => toggleMetric('income')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border ${
            activeMetrics?.income
              ? 'bg-success/10 border-success text-success' :'bg-muted border-border text-muted-foreground'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-success mr-2" />
          Income
        </button>
        <button
          onClick={() => toggleMetric('expenses')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border ${
            activeMetrics?.expenses
              ? 'bg-error/10 border-error text-error' :'bg-muted border-border text-muted-foreground'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-error mr-2" />
          Expenses
        </button>
        <button
          onClick={() => toggleMetric('savings')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border ${
            activeMetrics?.savings
              ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
          Savings
        </button>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Spending trends chart">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            {activeMetrics?.income && (
              chartType === 'line' ? (
                <Line 
                  type="monotone"
                  dataKey="income" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Income"
                />
              ) : (
                <Bar 
                  dataKey="income" 
                  fill="var(--color-success)" 
                  radius={[8, 8, 0, 0]}
                  name="Income"
                />
              )
            )}
            {activeMetrics?.expenses && (
              chartType === 'line' ? (
                <Line 
                  type="monotone"
                  dataKey="expenses" 
                  stroke="var(--color-error)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-error)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Expenses"
                />
              ) : (
                <Bar 
                  dataKey="expenses" 
                  fill="var(--color-error)" 
                  radius={[8, 8, 0, 0]}
                  name="Expenses"
                />
              )
            )}
            {activeMetrics?.savings && (
              chartType === 'line' ? (
                <Line 
                  type="monotone"
                  dataKey="savings" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Savings"
                />
              ) : (
                <Bar 
                  dataKey="savings" 
                  fill="var(--color-primary)" 
                  radius={[8, 8, 0, 0]}
                  name="Savings"
                />
              )
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrendChart;