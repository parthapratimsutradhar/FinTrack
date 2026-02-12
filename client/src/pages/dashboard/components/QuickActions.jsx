import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Add Expense',
      description: 'Record a new expense',
      icon: 'Minus',
      color: 'bg-error/10 text-error',
      path: '/add-transaction'
    },
    {
      id: 2,
      title: 'Add Income',
      description: 'Record new income',
      icon: 'Plus',
      color: 'bg-success/10 text-success',
      path: '/add-transaction'
    },
    {
      id: 3,
      title: 'View Reports',
      description: 'Analyze your spending',
      icon: 'BarChart3',
      color: 'bg-primary/10 text-primary',
      path: '/reports'
    },
    {
      id: 4,
      title: 'All Transactions',
      description: 'View complete history',
      icon: 'List',
      color: 'bg-secondary/10 text-secondary',
      path: '/expense-list'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Quick Actions
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Frequently used features
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => navigate(action?.path)}
            className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border border-border hover:border-primary hover:shadow-financial-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${action?.color} flex items-center justify-center mb-3`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <p className="text-xs md:text-sm font-medium text-card-foreground text-center mb-1">
              {action?.title}
            </p>
            <p className="text-xs text-muted-foreground text-center line-clamp-2">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;