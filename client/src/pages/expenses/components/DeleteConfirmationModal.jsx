import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  transactionCount = 1,
  isDeleting = false 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen && !isDeleting) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-modal-backdrop flex items-center justify-center p-4"
      onClick={(e) => {
        if (e?.target === e?.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-card rounded-2xl shadow-financial-xl p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
          </div>
          <div className="flex-1">
            <h3 id="delete-modal-title" className="text-xl font-heading font-semibold text-card-foreground mb-2">
              Delete {transactionCount === 1 ? 'Transaction' : 'Transactions'}?
            </h3>
            <p className="text-sm text-muted-foreground">
              {transactionCount === 1 
                ? 'This action cannot be undone. The transaction will be permanently deleted from your records.'
                : `This action cannot be undone. All ${transactionCount} selected transactions will be permanently deleted from your records.`
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            fullWidth
            className="sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            fullWidth
            className="sm:w-auto sm:ml-auto"
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;