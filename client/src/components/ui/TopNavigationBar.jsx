import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TopNavigationBar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      tooltip: 'Financial overview and recent activity'
    },
    { 
      label: 'Expenses', 
      path: '/expense-list', 
      icon: 'Receipt',
      tooltip: 'Manage your transactions'
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: 'BarChart3',
      tooltip: 'Advanced analytics and insights'
    },
  ];

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-nav bg-card shadow-financial z-nav">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-3 transition-smooth hover:opacity-80 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 rounded-lg"
            aria-label="ExpenseTracker Home"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              ExpenseTracker
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  px-4 py-2 rounded-lg transition-smooth
                  flex items-center space-x-2
                  focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground font-medium shadow-financial-sm'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
                title={item?.tooltip}
                aria-current={isActive(item?.path) ? 'page' : undefined}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                />
                <span className="text-sm">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth hover:bg-muted focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="User menu"
          >
            <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-foreground">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.email || 'user@example.com'}
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-smooth ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-popover rounded-lg shadow-financial-lg border border-border z-dropdown"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="p-3 border-b border-border">
                <div className="text-sm font-medium text-popover-foreground">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
              
              <div className="py-2">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                  role="menuitem"
                >
                  <Icon name="Settings" size={16} />
                  <span>Profile Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition-smooth flex items-center space-x-2"
                  role="menuitem"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-nav">
        <div className="h-full flex items-center justify-around px-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-smooth
                focus:outline-none focus:ring-2 focus:ring-primary
                ${isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
                }
              `}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <Icon 
                name={item?.icon} 
                size={22} 
                color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
              />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
          <button
            onClick={toggleDropdown}
            className={`
              flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-smooth
              focus:outline-none focus:ring-2 focus:ring-primary
              ${isDropdownOpen ? 'text-primary' : 'text-muted-foreground'}
            `}
            aria-expanded={isDropdownOpen}
          >
            <Icon 
              name="User" 
              size={22} 
              color={isDropdownOpen ? 'var(--color-primary)' : 'currentColor'} 
            />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;