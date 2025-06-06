'use client';

import { useState } from 'react';
import { Save, Bell, Lock, Globe, CreditCard, Mail, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Pickleball Booking',
    siteDescription: 'Book your pickleball courts online',
    contactEmail: 'admin@pickleball.com',
    supportPhone: '+1 (555) 123-4567',
    currency: 'USD',
    timezone: 'UTC',
    maintenanceMode: false,
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    bookingWindow: 30,
    cancellationWindow: 24,
    maxBookingsPerUser: 5,
    requirePhoneVerification: true,
    requireEmailVerification: true,
    enableReviews: true,
    enableRatings: true,
    enableSocialLogin: true,
    enableGoogleLogin: true,
    enableFacebookLogin: true,
    stripeEnabled: true,
    stripeTestMode: true,
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <button
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-4 border-b border-border">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 ${
            activeTab === 'general'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 ${
            activeTab === 'notifications'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('booking')}
          className={`px-4 py-2 ${
            activeTab === 'booking'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Booking
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 ${
            activeTab === 'security'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-2 ${
            activeTab === 'payment'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Payment
        </button>
      </div>

      {/* Settings Content */}
      <div className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Site Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.supportPhone}
                      onChange={(e) => handleSettingChange('supportPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="maintenanceMode" className="text-sm font-medium text-foreground">
                    Maintenance Mode
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="enableNotifications" className="text-sm font-medium text-foreground">
                    Enable Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableEmailNotifications"
                    checked={settings.enableEmailNotifications}
                    onChange={(e) => handleSettingChange('enableEmailNotifications', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="enableEmailNotifications" className="text-sm font-medium text-foreground">
                    Enable Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableSMSNotifications"
                    checked={settings.enableSMSNotifications}
                    onChange={(e) => handleSettingChange('enableSMSNotifications', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="enableSMSNotifications" className="text-sm font-medium text-foreground">
                    Enable SMS Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Settings */}
        {activeTab === 'booking' && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Booking Rules</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Booking Window (days)
                  </label>
                  <input
                    type="number"
                    value={settings.bookingWindow}
                    onChange={(e) => handleSettingChange('bookingWindow', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cancellation Window (hours)
                  </label>
                  <input
                    type="number"
                    value={settings.cancellationWindow}
                    onChange={(e) => handleSettingChange('cancellationWindow', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Max Bookings Per User
                  </label>
                  <input
                    type="number"
                    value={settings.maxBookingsPerUser}
                    onChange={(e) => handleSettingChange('maxBookingsPerUser', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requirePhoneVerification"
                    checked={settings.requirePhoneVerification}
                    onChange={(e) => handleSettingChange('requirePhoneVerification', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="requirePhoneVerification" className="text-sm font-medium text-foreground">
                    Require Phone Verification
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="requireEmailVerification" className="text-sm font-medium text-foreground">
                    Require Email Verification
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableReviews"
                    checked={settings.enableReviews}
                    onChange={(e) => handleSettingChange('enableReviews', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="enableReviews" className="text-sm font-medium text-foreground">
                    Enable Reviews
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableRatings"
                    checked={settings.enableRatings}
                    onChange={(e) => handleSettingChange('enableRatings', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="enableRatings" className="text-sm font-medium text-foreground">
                    Enable Ratings
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="stripeEnabled"
                    checked={settings.stripeEnabled}
                    onChange={(e) => handleSettingChange('stripeEnabled', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="stripeEnabled" className="text-sm font-medium text-foreground">
                    Enable Stripe Payments
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="stripeTestMode"
                    checked={settings.stripeTestMode}
                    onChange={(e) => handleSettingChange('stripeTestMode', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="stripeTestMode" className="text-sm font-medium text-foreground">
                    Test Mode
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Stripe Public Key
                  </label>
                  <input
                    type="text"
                    value={settings.stripePublicKey}
                    onChange={(e) => handleSettingChange('stripePublicKey', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 