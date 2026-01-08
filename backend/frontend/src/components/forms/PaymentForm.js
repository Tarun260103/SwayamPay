import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, Mail, Globe } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { paymentService } from '../../services/paymentService';
import toast from 'react-hot-toast';

const PaymentForm = ({ onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      // Mock payment processing - replace with actual API call
      const mockResponse = {
        data: {
          success: true,
          transactionId: 'TXN_' + Date.now(),
          message: 'Payment processed successfully'
        }
      };
      
      if (mockResponse.data.success) {
        toast.success('Payment processed successfully!');
        reset();
        if (onSuccess) onSuccess(mockResponse.data);
      } else {
        toast.error(mockResponse.data.message || 'Payment failed');
      }
    } catch (error) {
      toast.error('Payment processing failed');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Amount"
        type="number"
        step="0.01"
        placeholder="0.00"
        startIcon={<DollarSign className="h-4 w-4 text-gray-400" />}
        error={errors.amount?.message}
        {...register('amount', {
          required: 'Amount is required',
          min: { value: 0.01, message: 'Amount must be greater than 0' }
        })}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            {...register('currency')}
            defaultValue="USD"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <Input
          label="Customer Email"
          type="email"
          placeholder="customer@example.com"
          startIcon={<Mail className="h-4 w-4 text-gray-400" />}
          error={errors.customerEmail?.message}
          {...register('customerEmail', {
            required: 'Customer email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
      </div>

      <Input
        label="Description (Optional)"
        placeholder="Payment description"
        {...register('description')}
      />

      <Button
        type="submit"
        loading={isProcessing}
        className="w-full"
      >
        Process Payment
      </Button>
    </form>
  );
};

export default PaymentForm;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { DollarSign, Mail, Globe } from 'lucide-react';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import { paymentService } from '../../services/paymentService';
// import toast from 'react-hot-toast';

// const PaymentForm = ({ onSuccess }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const onSubmit = async (data) => {
//     setIsProcessing(true);
//     try {
//       const response = await paymentService.processPayment(data);
//       if (response.data.success) {
//         toast.success('Payment processed successfully!');
//         reset();
//         if (onSuccess) onSuccess(response.data);
//       } else {
//         toast.error(response.data.message || 'Payment failed');
//       }
//     } catch (error) {
//       toast.error('Payment processing failed');
//       console.error('Payment error:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Input
//         label="Amount"
//         type="number"
//         step="0.01"
//         placeholder="0.00"
//         startIcon={<DollarSign className="h-4 w-4 text-gray-400" />}
//         error={errors.amount?.message}
//         {...register('amount', {
//           required: 'Amount is required',
//           min: { value: 0.01, message: 'Amount must be greater than 0' }
//         })}
//       />

//       <div className="grid grid-cols-2 gap-4">
//         <Input
//           label="Currency"
//           defaultValue="USD"
//           startIcon={<Globe className="h-4 w-4 text-gray-400" />}
//           {...register('currency')}
//         >
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="GBP">GBP</option>
//         </Input>

//         <Input
//           label="Customer Email"
//           type="email"
//           placeholder="customer@example.com"
//           startIcon={<Mail className="h-4 w-4 text-gray-400" />}
//           error={errors.customerEmail?.message}
//           {...register('customerEmail', {
//             required: 'Customer email is required',
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           })}
//         />
//       </div>

//       <Input
//         label="Description (Optional)"
//         placeholder="Payment description"
//         {...register('description')}
//       />

//       <Button
//         type="submit"
//         loading={isProcessing}
//         className="w-full"
//       >
//         Process Payment
//       </Button>
//     </form>
//   );
// };

// export default PaymentForm;