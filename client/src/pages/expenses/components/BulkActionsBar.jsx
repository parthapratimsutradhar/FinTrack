import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onDeleteSelected, onDeselectAll }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-fab">
      <div className="bg-primary text-primary-foreground rounded-xl shadow-financial-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={20} color="var(--color-primary-foreground)" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {selectedCount} {selectedCount === 1 ? 'transaction' : 'transactions'} selected
              </p>
              <button
                onClick={onDeselectAll}
                className="text-xs opacity-80 hover:opacity-100 transition-smooth underline focus:outline-none"
              >
                Deselect all
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteSelected}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;