'use client';

import { useState, useEffect } from 'react';
import { Check, ArrowRight, Calendar, Users, Star, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/config';
import { Metadata } from "next";
import { MembershipHero } from "@/components/membership/hero";
import { PricingSection } from "@/components/membership/pricing-section";
import { TestimonialsSection } from "@/components/membership/testimonials-section";
import { FAQSection } from "@/components/membership/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { MembershipBenefits } from "@/components/membership/membership-benifits";
import JoinMembership from "@/components/membership/join-membership";
import { MembershipTier } from "@/types";

interface Membership {
  _id: string;
  type: 'monthly' | 'yearly';
  price: number;
  benefits: string[];
  description: string;
  duration: number; // in months
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// export const metadata: Metadata = {
//   title: "Membership | Pickleball Association Nagaland",
//   description: "Join the Pickleball Association Nagaland with our flexible membership options for individuals, families, and juniors."
// };

export default function MembershipPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);

  const memberships: Membership[] = [
    {
      _id: 'monthly',
      type: 'monthly',
      price: 29.99,
      benefits: [
        'Access to all courts',
        'Priority booking',
        'Free equipment rental',
        'Member-only events',
        '10% discount on lessons'
      ],
      description: 'Perfect for getting started with pickleball',
      duration: 1
    },
    {
      _id: 'yearly',
      type: 'yearly',
      price: 299.99,
      benefits: [
        'All monthly benefits',
        '2 months free',
        'Exclusive tournaments',
        'Personal coach consultation',
        '20% discount on lessons',
        'Free gear bag'
      ],
      description: 'Best value for regular players',
      duration: 12
    }
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Don't redirect immediately, allow users to view membership info
        return;
      }

      const response = await fetch(getApiUrl('api/v1/auth/me'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUser(data.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Don't set error for profile fetch failure
    }
  };

  const handleMembershipSelect = (membership: Membership) => {
    setSelectedMembership(membership);
    setStep(2);
    setShowPurchaseFlow(true);
  };

  const handlePlanSelection = (tier: MembershipTier) => {
    // Convert the tier from PricingSection to the Membership format
    const membership: Membership = {
      _id: tier.id,
      type: tier.id === 'visitor' ? 'monthly' : 'yearly',
      price: tier.price,
      benefits: tier.benefits,
      description: tier.name,
      duration: tier.id === 'visitor' ? 1 : 12
    };
    
    setSelectedMembership(membership);
    setStep(2);
    setShowPurchaseFlow(true);
  };

  const handleConfirmMembership = async () => {
    if (!selectedMembership || !user) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(getApiUrl('api/v1/memberships/purchase'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: selectedMembership.type,
          price: selectedMembership.price
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to purchase membership');
      }

      const data = await response.json();
      setStep(3);
    } catch (err) {
      console.error('Error purchasing membership:', err);
      setError(err instanceof Error ? err.message : 'Failed to purchase membership');
    } finally {
      setLoading(false);
    }
  };

  const getMembershipIcon = (type: string) => {
    switch (type) {
      case 'monthly':
        return <Calendar className="w-8 h-8" />;
      case 'yearly':
        return <Star className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  // Show purchase flow overlay if active
  if (showPurchaseFlow) {
    if (step === 1) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Membership
              </h1>
              <p className="text-xl text-gray-600">
                Join the Pickleball Association and unlock exclusive benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {memberships.map((membership) => (
                <div
                  key={membership._id}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleMembershipSelect(membership)}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      {getMembershipIcon(membership.type)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {membership.type.charAt(0).toUpperCase() + membership.type.slice(1)} Membership
                    </h3>
                    <p className="text-gray-600">{membership.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${membership.price}
                    </div>
                    <div className="text-gray-500">
                      per {membership.type === 'monthly' ? 'month' : 'year'}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    Select Plan
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => setShowPurchaseFlow(false)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Membership Information
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (step === 2 && selectedMembership && user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Confirm Your Membership
                </h2>
                <p className="text-gray-600">
                  Please review your membership details before confirming
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Membership Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Membership Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium">
                        {selectedMembership.type.charAt(0).toUpperCase() + selectedMembership.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {selectedMembership.duration} {selectedMembership.duration === 1 ? 'month' : 'months'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-blue-600">
                        ${selectedMembership.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Your Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Summary */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Membership Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedMembership.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Back to Plans
                </button>
                <button
                  onClick={handleConfirmMembership}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? 'Processing...' : 'Confirm Membership'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the Club!
              </h2>
              <p className="text-gray-600 mb-8">
                Your membership has been successfully activated. You now have access to all member benefits.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowPurchaseFlow(false);
                    setStep(1);
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Back to Membership Page
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Main membership page with all components
  return (
    <div>
      <MembershipHero />
      <MembershipBenefits />
      <PricingSection onSelectPlan={handlePlanSelection} />
      <TestimonialsSection />
      <FAQSection />
      <JoinMembership />
      <CTASection />
    </div>
  );
}