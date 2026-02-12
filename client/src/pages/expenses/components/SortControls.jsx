import React from 'react';
import Icon from '../../../components/AppIcon';


const SortControls = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'amount', label: 'Amount', icon: 'DollarSign' },
    { value: 'title', label: 'Title', icon: 'Type' }
  ];

  const handleSortClick = (field) => {
    if (sortBy === field) {
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'desc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-financial-sm p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="ArrowUpDown" size={18} color="var(--color-primary)" />
          <span className="text-sm font-medium text-card-foreground">Sort by:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {sortOptions?.map((option) => {
            const isActive = sortBy === option?.value;
            return (
              <button
                key={option?.value}
                onClick={() => handleSortClick(option?.value)}
                className={`
                  px-4 py-2 rounded-lg transition-smooth flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-primary
                  ${isActive
                    ? 'bg-primary text-primary-foreground shadow-financial-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                <Icon 
                  name={option?.icon} 
                  size={16} 
                  color={isActive ? 'var(--color-primary-foreground)' : 'currentColor'}
                />
                <span className="text-sm font-medium">{option?.label}</span>
                {isActive && (
                  <Icon 
                    name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                    size={14}
                    color="var(--color-primary-foreground)"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortControls;