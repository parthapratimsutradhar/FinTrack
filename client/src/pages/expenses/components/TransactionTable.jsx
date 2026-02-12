import React from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const TransactionTable = ({ 
  transactions, 
  selectedIds, 
  onSelectTransaction, 
  onSelectAll, 
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

  const allSelected = transactions?.length > 0 && selectedIds?.length === transactions?.length;
  const someSelected = selectedIds?.length > 0 && selectedIds?.length < transactions?.length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-financial overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  aria-label="Select all transactions"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-card-foreground">Title</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-card-foreground">Category</span>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-semibold text-card-foreground">Amount</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-card-foreground">Type</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-card-foreground">Date</span>
              </th>
              <th className="px-4 py-3 text-center w-32">
                <span className="text-sm font-semibold text-card-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr 
                key={transaction?.id}
                className="hover:bg-muted/30 transition-smooth"
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedIds?.includes(transaction?.id)}
                    onChange={() => onSelectTransaction(transaction?.id)}
                    aria-label={`Select ${transaction?.title}`}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-${transaction?.type === 'income' ? 'success' : 'primary'}/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon 
                        name={getCategoryIcon(transaction?.category)} 
                        size={18} 
                        className={getCategoryColor(transaction?.category)}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {transaction?.title}
                      </p>
                      {transaction?.description && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {transaction?.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-card-foreground capitalize">
                    {transaction?.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`text-sm font-semibold whitespace-nowrap ${
                    transaction?.type === 'income' ? 'text-success' : 'text-error'
                  }`}>
                    {formatAmount(transaction?.amount, transaction?.type)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${
                    transaction?.type === 'income' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    <Icon 
                      name={transaction?.type === 'income' ? 'TrendingUp' : 'TrendingDown'} 
                      size={12}
                    />
                    {transaction?.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(transaction?.date)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="w-8 h-8 rounded-lg hover:bg-primary/10 transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Edit ${transaction?.title}`}
                      title="Edit transaction"
                    >
                      <Icon name="Edit2" size={16} color="var(--color-primary)" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction?.id)}
                      className="w-8 h-8 rounded-lg hover:bg-error/10 transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-error"
                      aria-label={`Delete ${transaction?.title}`}
                      title="Delete transaction"
                    >
                      <Icon name="Trash2" size={16} color="var(--color-error)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;