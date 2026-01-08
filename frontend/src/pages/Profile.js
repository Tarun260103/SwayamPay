import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Building, Shield, Bell, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john.doe@example.com',
    businessName: 'Tech Solutions Inc.',
    phone: '+1 (555) 123-4567'
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  startIcon={<User className="h-4 w-4 text-gray-400" />}
                />
                <Input
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  startIcon={<User className="h-4 w-4 text-gray-400" />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  startIcon={<Mail className="h-4 w-4 text-gray-400" />}
                />
                <Input
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  startIcon={<User className="h-4 w-4 text-gray-400" />}
                />
                <Input
                  label="Business Name"
                  value={profileData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  disabled={!isEditing}
                  startIcon={<Building className="h-4 w-4 text-gray-400" />}
                  className="md:col-span-2"
                />
              </div>
              
              {isEditing && (
                <div className="mt-6">
                  <Button
                    onClick={handleSave}
                    loading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Enable
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-600">Last changed 2 weeks ago</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Account Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-primary-600">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email notifications</span>
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Fraud alerts</span>
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Payment confirmations</span>
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Monthly reports</span>
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;