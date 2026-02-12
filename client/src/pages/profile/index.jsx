import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import UserInfoCard from './components/UserInfoCard';
import AccountSecurity from './components/AccountSecurity';
import AccountSettings from './components/AccountSettings';
import ChangePasswordModal from './components/ChangePasswordModal';
import { AlertCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    // MOCKED USER DATA FOR FRONTEND
    const fetchUserData = async () => {
      try {
        // Simulate async API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockUser = {
          email: 'johndoe@example.com',
          user_metadata: {
            name: 'John Doe'
          }
        };

        setUser(mockUser);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // MOCK LOGOUT
    navigate('/login');
  };

  const handlePasswordChange = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigationBar 
          user={{ name: 'Loading...', email: '' }} 
          onLogout={handleLogout} 
        />
        <div className="pt-nav pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigationBar 
          user={{ name: 'User', email: '' }} 
          onLogout={handleLogout} 
        />
        <div className="pt-nav pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="text-destructive mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-destructive">Error</h3>
                <p className="text-sm text-destructive/90 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar 
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')?.[0] || 'User',
          email: user?.email || ''
        }} 
        onLogout={handleLogout} 
      />
      
      <div className="pt-nav pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-semibold text-foreground">
              Profile Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account information and preferences
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start space-x-3 mb-6">
              <AlertCircle className="text-destructive mt-0.5" size={20} />
              <div>
                <p className="text-sm text-destructive/90">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <UserInfoCard user={user} />
            <AccountSecurity 
              user={user} 
              onPasswordChange={handlePasswordChange}
            />
            <AccountSettings user={user} />
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
      />
    </div>
  );
};

export default Profile;
