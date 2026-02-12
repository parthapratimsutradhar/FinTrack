import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters, onAddTransaction }) => {
  if (hasFilters) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-financial p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground mb-3">
          No transactions found
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any transactions matching your filters. Try adjusting your search criteria or clear all filters.
        </p>
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-financial p-8 md:p-12 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Receipt" size={32} color="var(--color-primary)" />
      </div>
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground mb-3">
        No transactions yet
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md mx-auto">
        Start tracking your finances by adding your first transaction. Click the button below to get started.
      </p>
      <Button
        variant="default"
        onClick={onAddTransaction}
        iconName="Plus"
        iconPosition="left"
      >
        Add Your First Transaction
      </Button>
    </div>
  );
};

export default EmptyState;