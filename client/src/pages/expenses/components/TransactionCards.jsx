import React from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const TransactionCards = ({ 
  transactions, 
  selectedIds, 
  onSelectTransaction, 
  onEdit, 
  onDelete 
}) => {
  const getCategoryIcon = (category) => {
    const icons = {
      food: 'Utensils',
      transport: 'Car',
      utilities: 'Zap',
      entertainment: 'Film',
      healthcare: 'Heart',
      shopping: 'ShoppingBag',
      education: 'GraduationCap',
      income: 'TrendingUp',
      other: 'MoreHorizontal'
    };
    return icons?.[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: 'text-orange-600',
      transport: 'text-blue-600',
      utilities: 'text-yellow-600',
      entertainment: 'text-purple-600',
      healthcare: 'text-red-600',
      shopping: 'text-pink-600',
      education: 'text-green-600',
      income: 'text-emerald-600',
      other: 'text-gray-600'
    };
    return colors?.[category] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatAmount = (amount, type) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(Math.abs(amount));
    return type === 'income' ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {transactions?.map((transaction) => (
        <div 
          key={transaction?.id}
          className="bg-card border border-border rounded-xl shadow-financial-sm hover:shadow-financial transition-smooth overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Checkbox
                  checked={selectedIds?.includes(transaction?.id)}
                  onChange={() => onSelectTransaction(transaction?.id)}
                  aria-label={`Select ${transaction?.title}`}
                  className="mt-1"
                />
                <div className={`w-12 h-12 rounded-lg bg-${transaction?.type === 'income' ? 'success' : 'primary'}/10 flex items-center justify-center flex-shrink-0`}>
                  <Icon 
                    name={getCategoryIcon(transaction?.category)} 
                    size={20} 
                    className={getCategoryColor(transaction?.category)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-card-foreground truncate">
                    {transaction?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatDate(transaction?.date)}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-lg font-bold whitespace-nowrap ${
                  transaction?.type === 'income' ? 'text-success' : 'text-error'
                }`}>
                  {formatAmount(transaction?.amount, transaction?.type)}
                </p>
              </div>
            </div>

            {transaction?.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {transaction?.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-card-foreground capitalize">
                  {transaction?.category}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${
                  transaction?.type === 'income' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  <Icon 
                    name={transaction?.type === 'income' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12}
                  />
                  {transaction?.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="w-9 h-9 rounded-lg hover:bg-primary/10 transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Edit ${transaction?.title}`}
                >
                  <Icon name="Edit2" size={18} color="var(--color-primary)" />
                </button>
                <button
                  onClick={() => onDelete(transaction?.id)}
                  className="w-9 h-9 rounded-lg hover:bg-error/10 transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-error"
                  aria-label={`Delete ${transaction?.title}`}
                >
                  <Icon name="Trash2" size={18} color="var(--color-error)" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCards;