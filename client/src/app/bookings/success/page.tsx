'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BookingSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // You can integrate with analytics here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-lg p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex rounded-full p-4 bg-green-100 text-green-600 mb-4"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your court booking has been confirmed. You'll receive a confirmation email shortly.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => router.push('/profile')}
            >
              View My Bookings
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 