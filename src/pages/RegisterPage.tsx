import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setPasswordError('');
    clearError();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    await register(name, email, password);
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <div className="flex">
                <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
              </div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Full name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={18} className="text-gray-500 dark:text-gray-400" />}
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              leftIcon={<Mail size={18} className="text-gray-500 dark:text-gray-400" />}
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              leftIcon={<Lock size={18} className="text-gray-500 dark:text-gray-400" />}
              error={passwordError}
            />
            
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              label="Confirm password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
              }}
              leftIcon={<Lock size={18} className="text-gray-500 dark:text-gray-400" />}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-dark-400 dark:bg-dark-300"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;