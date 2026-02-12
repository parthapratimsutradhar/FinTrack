import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, amount, type, icon, trend }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'income':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          iconColor: 'var(--color-success)'
        };
      case 'expense':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          iconColor: 'var(--color-error)'
        };
      case 'balance':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-foreground',
          iconColor: 'currentColor'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial hover:shadow-financial-md transition-smooth border border-border">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${styles?.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} color={styles?.iconColor} className="md:w-6 md:h-6" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs md:text-sm ${trend?.isPositive ? 'text-success' : 'text-error'}`}>
            <Icon name={trend?.isPositive ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span className="font-medium">{trend?.percentage}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{title}</p>
        <p className={`text-2xl md:text-3xl lg:text-4xl font-heading font-bold ${styles?.text}`}>
          ${amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;