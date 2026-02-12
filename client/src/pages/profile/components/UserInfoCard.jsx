import React from 'react';
import { User, Calendar } from 'lucide-react';

const UserInfoCard = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const displayName = user?.user_metadata?.name || 
                      user?.user_metadata?.full_name || 
                      user?.email?.split('@')?.[0] || 
                      'User';

  return (
    <div className="bg-card rounded-xl shadow-financial-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        User Information
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
            <User size={48} className="text-primary" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Display Name
            </label>
            <p className="text-base font-medium text-card-foreground mt-1">
              {displayName}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <p className="text-base font-medium text-card-foreground mt-1">
              {user?.email || 'N/A'}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>
              Account created on {formatDate(user?.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;