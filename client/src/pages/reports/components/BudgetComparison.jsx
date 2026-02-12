import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const BudgetComparison = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const budgetData = payload?.find(p => p?.dataKey === 'budget');
      const actualData = payload?.find(p => p?.dataKey === 'actual');
      const variance = actualData?.value - budgetData?.value;
      const variancePercent = (variance / budgetData?.value) * 100;

      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-financial-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Budget:</span>
              <span className="text-sm font-medium text-primary">
                ${budgetData?.value?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Actual:</span>
              <span className="text-sm font-medium text-foreground">
                ${actualData?.value?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Variance:</span>
              <span className={`text-sm font-medium ${
                variance > 0 ? 'text-error' : 'text-success'
              }`}>
                {variance > 0 ? '+' : ''}${Math.abs(variance)?.toLocaleString()}
                <span className="text-xs ml-1">({variancePercent?.toFixed(1)}%)</span>
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
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Budget vs Actual
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Compare planned budget with actual spending
        </p>
      </div>

      <div className="w-full h-80 md:h-96" aria-label="Budget comparison chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <YAxis 
              type="category"
              dataKey="category" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)' }} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="budget" 
              fill="var(--color-primary)" 
              radius={[0, 8, 8, 0]}
              name="Budget"
            />
            <Bar 
              dataKey="actual" 
              radius={[0, 8, 8, 0]}
              name="Actual"
            >
              {data?.map((entry, index) => {
                const isOverBudget = entry?.actual > entry?.budget;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isOverBudget ? 'var(--color-error)' : 'var(--color-success)'}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overspending Alert */}
      <div className="mt-4 space-y-2">
        {data?.filter(item => item?.actual > item?.budget)?.map((item, index) => {
          const overspend = item?.actual - item?.budget;
          const overspendPercent = (overspend / item?.budget) * 100;
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-error/10 border border-error/20 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">{item?.category} over budget</span>
              </div>
              <span className="text-sm font-semibold text-error">
                +${overspend?.toLocaleString()} ({overspendPercent?.toFixed(1)}%)
              </span>
            </div>
          );
        })}
        {data?.filter(item => item?.actual > item?.budget)?.length === 0 && (
          <div className="flex items-center justify-center p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success mr-2" />
            <span className="text-sm font-medium text-success">
              All categories within budget
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetComparison;