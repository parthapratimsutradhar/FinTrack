import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      setAuthError('');
      setSuccess(false);
      setPasswordStrength(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const password = formData.newPassword;
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (password?.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [formData.newPassword]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    else if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    else if (formData.newPassword === formData.currentPassword) newErrors.newPassword = 'New password must be different from current password';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your new password';
    else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!validateForm()) return;
    setLoading(true);

    // MOCK FRONTEND PASSWORD CHANGE
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate async
    if (formData.currentPassword !== 'password123') {
      setAuthError('Current password is incorrect');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => onClose(), 1500);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-destructive';
    if (passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal-backdrop flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-financial-xl border border-border w-full max-w-md z-modal">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-card-foreground">Change Password</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {authError && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="text-destructive mt-0.5" size={20} />
              <div><p className="text-sm text-destructive">{authError}</p></div>
            </div>
          )}
          {success && (
            <div className="bg-success/10 border border-success rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="text-success mt-0.5" size={20} />
              <div><p className="text-sm text-success">Password changed successfully!</p></div>
            </div>
          )}

          <div className="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              label="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              error={errors.currentPassword}
              disabled={loading || success}
            />
            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none" tabIndex={-1}>
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              label="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
              disabled={loading || success}
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none" tabIndex={-1}>
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {formData.newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password Strength:</span>
                <span className={`font-medium ${passwordStrength <= 1 ? 'text-destructive' : passwordStrength <= 3 ? 'text-warning': 'text-success'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full transition-all ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }} />
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              disabled={loading || success}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none" tabIndex={-1}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="flex-1">Cancel</Button>
            <Button type="submit" loading={loading} disabled={success} className="flex-1">{success ? 'Password Changed' : 'Change Password'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
