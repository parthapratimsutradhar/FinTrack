import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryAnalysis = ({ data }) => {
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
              <span className="text-xs text-muted-foreground">Spent:</span>
              <span className="text-sm font-medium text-popover-foreground">
                ${data?.value?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Budget:</span>
              <span className="text-sm font-medium text-popover-foreground">
                ${data?.payload?.budget?.toLocaleString()}
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

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Category Analysis
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Detailed breakdown of spending by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64" aria-label="Category distribution pie chart">
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {data?.map((category, index) => {
            const utilizationPercent = (category?.spent / category?.budget) * 100;
            return (
              <div
                key={index}
                className="p-3 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="flex items-center justify-center w-8 h-8 rounded-full" 
                      style={{ backgroundColor: COLORS?.[category?.name] }}
                    >
                      <Icon name={ICONS?.[category?.name]} size={14} color="white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{category?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${category?.spent?.toLocaleString()} / ${category?.budget?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">
                      {category?.percentage}%
                    </p>
                    <p className={`text-xs ${
                      utilizationPercent > 100 ? 'text-error' : 'text-success'
                    }`}>
                      {utilizationPercent?.toFixed(0)}% used
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      utilizationPercent > 100 ? 'bg-error' : 'bg-success'
                    }`}
                    style={{ 
                      width: `${Math.min(utilizationPercent, 100)}%`,
                      backgroundColor: COLORS?.[category?.name]
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;