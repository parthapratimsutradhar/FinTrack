import React, { useState } from 'react';
import { Bell, DollarSign, Download, Check } from 'lucide-react';
import Button from '../../../components/ui/Button';

const AccountSettings = ({ user }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    // Auto-save simulation
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportData = () => {
    // Export data functionality placeholder
    alert('Data export functionality will be implemented');
  };

  return (
    <div className="bg-card rounded-xl shadow-financial-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Account Settings
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Bell size={18} className="text-muted-foreground" />
            <h3 className="text-base font-medium text-card-foreground">
              Notification Preferences
            </h3>
          </div>
          
          <div className="space-y-3 ml-6">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                  Email Notifications
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive updates and alerts via email
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => {
                    setEmailNotifications(e?.target?.checked);
                    handleSaveSettings();
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-smooth peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-smooth peer-checked:translate-x-5"></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                  Push Notifications
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive push notifications on your device
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => {
                    setPushNotifications(e?.target?.checked);
                    handleSaveSettings();
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-smooth peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-smooth peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign size={18} className="text-muted-foreground" />
            <h3 className="text-base font-medium text-card-foreground">
              Currency
            </h3>
          </div>
          
          <div className="ml-6">
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e?.target?.value);
                handleSaveSettings();
              }}
              className="w-full md:w-64 h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              Select your preferred currency for displaying amounts
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Download size={18} className="text-muted-foreground" />
            <h3 className="text-base font-medium text-card-foreground">
              Data Export
            </h3>
          </div>
          
          <div className="ml-6">
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of your account data and transaction history
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportData}
            >
              <Download size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success rounded-lg">
            <Check size={16} className="text-success" />
            <span className="text-sm text-success">Settings saved successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;