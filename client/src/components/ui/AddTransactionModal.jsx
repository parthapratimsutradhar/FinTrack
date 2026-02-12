import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    type: 'expense',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const categoryOptions = [
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
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        firstInputRef?.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    const hasChanges = Object.values(formData)?.some(value => 
      value !== '' && value !== new Date()?.toISOString()?.split('T')?.[0] && value !== 'expense'
    );

    if (hasChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date()?.toISOString()?.split('T')?.[0],
      type: 'expense',
      description: ''
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData?.amount),
        id: Date.now(),
        createdAt: new Date()?.toISOString()
      });

      resetForm();
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to add transaction. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-modal-backdrop flex items-start md:items-center justify-center p-0 md:p-4"
      onClick={(e) => {
        if (e?.target === e?.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="fixed inset-0 bg-background" aria-hidden="true" />
      <div 
        ref={modalRef}
        className="relative w-full h-full md:h-auto md:max-w-2xl bg-card md:rounded-2xl shadow-financial-xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 id="modal-title" className="text-2xl font-heading font-semibold text-card-foreground">
            Add Transaction
          </h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-lg hover:bg-muted transition-smooth flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                ref={firstInputRef}
                label="Transaction Title"
                type="text"
                placeholder="e.g., Grocery Shopping"
                value={formData?.title}
                onChange={(e) => handleChange('title', e?.target?.value)}
                error={errors?.title}
                required
              />
            </div>

            <Input
              label="Amount"
              type="number"
              placeholder="0.00"
              value={formData?.amount}
              onChange={(e) => handleChange('amount', e?.target?.value)}
              error={errors?.amount}
              required
              min="0"
              step="0.01"
            />

            <Select
              label="Type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleChange('type', value)}
              required
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleChange('category', value)}
              error={errors?.category}
              placeholder="Select category"
              searchable
              required
            />

            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleChange('date', e?.target?.value)}
              error={errors?.date}
              required
              max={new Date()?.toISOString()?.split('T')?.[0]}
            />

            <div className="md:col-span-2">
              <Input
                label="Description (Optional)"
                type="text"
                placeholder="Add notes about this transaction"
                value={formData?.description}
                onChange={(e) => handleChange('description', e?.target?.value)}
              />
            </div>
          </div>

          {errors?.submit && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <p className="text-sm text-error">{errors?.submit}</p>
            </div>
          )}

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              fullWidth
              className="md:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              fullWidth
              className="md:w-auto md:ml-auto"
              iconName="Plus"
              iconPosition="left"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;