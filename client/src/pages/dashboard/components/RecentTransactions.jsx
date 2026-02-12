import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'UtensilsCrossed',
      Rent: 'Home',
      Travel: 'Plane',
      Shopping: 'ShoppingBag',
      Health: 'Heart',
      Other: 'MoreHorizontal'
    };
    return icons?.[category] || 'DollarSign';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-500/10 text-orange-600',
      Rent: 'bg-primary/10 text-primary',
      Travel: 'bg-secondary/10 text-secondary',
      Shopping: 'bg-purple-500/10 text-purple-600',
      Health: 'bg-red-500/10 text-red-600',
      Other: 'bg-gray-500/10 text-gray-600'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
            Recent Transactions
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Your latest financial activities
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/expense-list')}
          iconName="ArrowRight"
          iconPosition="right"
          className="hidden sm:flex"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {transactions?.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Icon name="Receipt" size={32} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              No transactions yet
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/add-transaction')}
              iconName="Plus"
              iconPosition="left"
            >
              Add Your First Transaction
            </Button>
          </div>
        ) : (
          <>
            {transactions?.map((transaction) => (
              <div
                key={transaction?.id}
                className="flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-muted transition-smooth cursor-pointer border border-transparent hover:border-border"
                onClick={() => navigate('/expense-list')}
              >
                <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getCategoryColor(transaction?.category)}`}>
                    <Icon name={getCategoryIcon(transaction?.category)} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-card-foreground truncate">
                      {transaction?.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{transaction?.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formatDate(transaction?.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-sm md:text-base font-semibold whitespace-nowrap ${
                      transaction?.type === 'income' ? 'text-success' : 'text-error'
                    }`}>
                      {transaction?.type === 'income' ? '+' : '-'}${transaction?.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground hidden sm:block" />
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              fullWidth
              onClick={() => navigate('/expense-list')}
              iconName="ArrowRight"
              iconPosition="right"
              className="mt-4 sm:hidden"
            >
              View All Transactions
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;