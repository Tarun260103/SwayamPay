import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Building } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          startIcon={<User className="h-4 w-4 text-gray-400" />}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: 'First name is required'
          })}
        />

        <Input
          label="Last Name"
          placeholder="Doe"
          startIcon={<User className="h-4 w-4 text-gray-400" />}
          error={errors.lastName?.message}
          {...register('lastName', {
            required: 'Last name is required'
          })}
        />
      </div>

      <Input
        label="Business Name"
        placeholder="Your Business Inc."
        startIcon={<Building className="h-4 w-4 text-gray-400" />}
        error={errors.businessName?.message}
        {...register('businessName', {
          required: 'Business name is required'
        })}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="your@business.com"
        startIcon={<Mail className="h-4 w-4 text-gray-400" />}
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        startIcon={<Lock className="h-4 w-4 text-gray-400" />}
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        startIcon={<Lock className="h-4 w-4 text-gray-400" />}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;