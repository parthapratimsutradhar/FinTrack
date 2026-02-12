import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = ({ onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShow = ['/dashboard', '/expense-list']?.includes(location?.pathname);

  if (!shouldShow) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/add-transaction');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 md:bottom-6 md:right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-financial-lg hover:shadow-financial-xl transition-smooth hover:scale-105 active:scale-97 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 z-fab flex items-center justify-center"
      aria-label="Add new transaction"
      title="Add Transaction"
    >
      <Icon name="Plus" size={24} color="var(--color-primary-foreground)" />
    </button>
  );
};

export default FloatingActionButton;