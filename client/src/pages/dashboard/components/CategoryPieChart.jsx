import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = {
    Food: '#E67E22',
    Rent: '#1E3A5F',
    Travel: '#2D5A4A',
    Shopping: '#9B59B6',
    Health: '#E74C3C',
    Other: '#95A5A6'
  };

  const ICONS = {
    Food: 'UtensilsCrossed',
    Rent: 'Home',
    Travel: 'Plane',
    Shopping: 'ShoppingBag',
    Health: 'Heart',
    Other: 'MoreHorizontal'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-financial-md">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.payload?.fill }}
            />
            <p className="text-sm font-medium text-popover-foreground">{data?.name}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Amount:</span>
              <span className="text-sm font-medium text-popover-foreground">
                ${data?.value?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Percentage:</span>
              <span className="text-sm font-medium text-popover-foreground">
                {data?.payload?.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mt-4">
        {payload?.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: entry?.color }}>
              <Icon name={ICONS?.[entry?.value]} size={12} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-card-foreground truncate">{entry?.value}</p>
              <p className="text-xs text-muted-foreground">${entry?.payload?.value?.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Expense by Category
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Distribution of spending across categories
        </p>
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Category-wise expense distribution pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS?.[entry?.name]} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;