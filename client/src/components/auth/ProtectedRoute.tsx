'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogIn, User } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please log in to book a court and access your account features.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => router.push('/login')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login to Continue
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/register')}
            >
              Create Account
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
} 