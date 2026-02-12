import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  onExport 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'education', label: 'Education' },
    { value: 'income', label: 'Income' },
    { value: 'other', label: 'Other' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' }
  ];

  const hasActiveFilters = filters?.category || filters?.type || filters?.dateFrom || filters?.dateTo || filters?.search;

  return (
    <div className="bg-card border border-border rounded-xl shadow-financial-sm">
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center justify-between lg:justify-start gap-3">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size={20} color="var(--color-primary)" />
              <h3 className="text-lg font-heading font-semibold text-card-foreground">
                Filters
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden w-9 h-9 rounded-lg hover:bg-muted transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={20} 
              />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="px-3 py-1.5 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium text-primary">
                {resultCount} {resultCount === 1 ? 'transaction' : 'transactions'}
              </span>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear Filters
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4 lg:mt-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder="Search transactions..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full"
            />

            <Select
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => onFilterChange('category', value)}
              placeholder="Select category"
            />

            <Select
              options={typeOptions}
              value={filters?.type}
              onChange={(value) => onFilterChange('type', value)}
              placeholder="Select type"
            />

            <div className="flex gap-2">
              <Input
                type="date"
                value={filters?.dateFrom}
                onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
                placeholder="From date"
                max={new Date()?.toISOString()?.split('T')?.[0]}
              />
              <Input
                type="date"
                value={filters?.dateTo}
                onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
                placeholder="To date"
                max={new Date()?.toISOString()?.split('T')?.[0]}
              />
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="px-3 py-1.5 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium text-primary">
                {resultCount} results
              </span>
            </div>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  iconName="X"
                >
                  Clear
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                iconName="Download"
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;