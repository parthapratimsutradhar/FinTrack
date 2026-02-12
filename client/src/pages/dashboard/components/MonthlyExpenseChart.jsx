import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const MonthlyExpenseChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-financial-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">{payload?.[0]?.payload?.month}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Income:</span>
              <span className="text-sm font-medium text-success">
                ${payload?.[0]?.payload?.income?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Expenses:</span>
              <span className="text-sm font-medium text-error">
                ${payload?.[0]?.payload?.expenses?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
            Monthly Overview
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Income vs Expenses comparison
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition-smooth ${
              chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="Bar chart view"
          >
            <Icon name="BarChart3" size={16} />
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition-smooth ${
              chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="Line chart view"
          >
            <Icon name="LineChart" size={16} />
          </button>
        </div>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Monthly income and expenses bar chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)' }} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="income" 
              fill="var(--color-success)" 
              radius={[8, 8, 0, 0]}
              name="Income"
            />
            <Bar 
              dataKey="expenses" 
              fill="var(--color-error)" 
              radius={[8, 8, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;