import React from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

const AccountSecurity = ({ user, onPasswordChange }) => {
  const isEmailVerified = user?.email_confirmed_at !== null;

  return (
    <div className="bg-card rounded-xl shadow-financial-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Account Security
      </h2>

      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Shield size={18} className="text-muted-foreground" />
              <h3 className="text-base font-medium text-card-foreground">
                Email Verification
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {isEmailVerified 
                ? 'Your email address has been verified' 
                : 'Please verify your email address to secure your account'
              }
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            {isEmailVerified ? (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-lg">
                <CheckCircle size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Verified</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-warning/10 rounded-lg">
                <AlertCircle size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">Unverified</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-medium text-card-foreground mb-2">
                Password
              </h3>
              <p className="text-sm text-muted-foreground">
                Change your password to keep your account secure
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onPasswordChange}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;