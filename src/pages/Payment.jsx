import React, { useState, useMemo } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useCreatePaymentIntentMutation } from '../store/apis/payment.api';
import { useGetAllAddonsQuery } from '../store/apis/plans.api';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({ planData, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      onError('Stripe is not loaded. Please refresh the page.');
      return;
    }

    if (!cardholderName || !email) {
      onError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Step 1: Create payment intent on server
      const paymentIntentResult = await createPaymentIntent({
        amount: planData.totalAmount,
        currency: 'usd',
        planId: planData.planId,
        selectedAddons: planData.selectedAddons,
        billingType: planData.billingType,
        metadata: {
          cardholderName,
          email,
          planName: planData.planName,
          addonsCount: planData.selectedAddons.length
        }
      }).unwrap();

      const clientSecret = paymentIntentResult.data?.clientSecret;
      
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: email,
          },
        },
      });
      
      if (result.error) {
        onError(result.error.message);
      } else {
        // Payment succeeded!
        onSuccess({
          id: result.paymentIntent.id,
          amount: planData.totalAmount,
          status: result.paymentIntent.status,
          planData: planData,
          paymentIntent: result.paymentIntent
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError(error.data?.message || error.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
        </div>
        
        {/* Payment Summary */}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{planData.planName} ({planData.billingType})</span>
              <span className="font-medium">${planData.planPrice}</span>
            </div>
            {planData.addonsDetails.map((addon, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{addon.name}</span>
                <span className="font-medium">${addon.price}</span>
              </div>
            ))}
            <div className="border-t pt-1 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>${planData.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name *
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john.doe@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Details *
          </label>
          <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !stripe || !cardholderName || !email}
          className={`w-full mt-6 py-3 px-4 rounded-md font-medium text-white transition-colors ${
            isLoading || !stripe || !cardholderName || !email
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </div>
          ) : (
            `Pay $${planData.totalAmount}`
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  );
};

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  const selectedPlan = useSelector((state) => state.plans?.selectedPlan);
  
  // Fetch all addons to get pricing details
  const { 
    data: addonsResponse, 
    isLoading: addonsLoading, 
    error: addonsError 
  } = useGetAllAddonsQuery();

  // Calculate total amount and prepare payment data
  const planData = useMemo(() => {
    if (!selectedPlan || addonsLoading) {
      return {
        totalAmount: 0,
        planPrice: 0,
        planId: null,
        planName: 'Loading...',
        billingType: 'monthly',
        selectedAddons: [],
        addonsDetails: []
      };
    }

    // Get plan details
    const planPrice = selectedPlan.billingType === 'yearly' 
      ? selectedPlan.selectedCard?.rate?.yearly?.price || 0
      : selectedPlan.selectedCard?.rate?.monthly?.price || 0;

    const planId = selectedPlan.selectedCard?.key || selectedPlan.selectedCard?.originalData?._id;
    const planName = selectedPlan.selectedCard?.originalData?.plan_name || 'Selected Plan';

    // Calculate addons total
    let addonsTotal = 0;
    const addonsDetails = [];
    const selectedAddonIds = Object.keys(selectedPlan.selectedAddOns || {});

    if (addonsResponse?.data && selectedAddonIds.length > 0) {
      // Create addon lookup map
      const addonMap = {};
      addonsResponse.data.forEach(addon => {
        addonMap[addon._id] = addon;
      });

      // Calculate addon prices and details
      selectedAddonIds.forEach(addonId => {
        const addon = addonMap[addonId];
        if (addon) {
          // Use yearly price if billing is yearly, otherwise monthly
          const addonPrice = selectedPlan.billingType === 'yearly' && addon.yearly_price 
            ? addon.yearly_price 
            : addon.price;
          
          addonsTotal += addonPrice;
          addonsDetails.push({
            id: addon._id,
            name: addon.addon_name,
            price: addonPrice
          });
        }
      });
    }

    return {
      totalAmount: planPrice + addonsTotal,
      planPrice: planPrice,
      planId: planId,
      planName: planName,
      billingType: selectedPlan.billingType || 'monthly',
      selectedAddons: selectedAddonIds,
      addonsDetails: addonsDetails
    };

  }, [selectedPlan, addonsResponse, addonsLoading]);

  const handlePaymentSuccess = (payment) => {
    setPaymentStatus('success');
    setPaymentDetails(payment);
    setPaymentError('');
    console.log('Payment successful:', payment);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    setPaymentError(error);
    console.error('Payment failed:', error);
  };

  const resetPaymentState = () => {
    setPaymentStatus('');
    setPaymentError('');
    setPaymentDetails(null);
  };

  // Loading state
  if (addonsLoading) {
    return (
      <div className="min-h-screen bg-[#1E2A38] py-12 px-4 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (addonsError) {
    return (
      <div className="min-h-screen bg-[#1E2A38] py-12 px-4 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Error loading payment details</p>
        </div>
      </div>
    );
  }

  // No plan selected
  if (!selectedPlan || !planData.planId) {
    return (
      <div className="min-h-screen bg-[#1E2A38] py-12 px-4 flex items-center justify-center">
        <div className="text-white text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>No plan selected. Please go back and select a plan.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#1E2A38] py-12 px-4">
        <div className="max-w-md mx-auto p-6 bg-green-100 rounded-lg shadow-lg text-center">
          <div className="text-green-600 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
          <div className="text-green-700 space-y-1">
            <p>Plan: {paymentDetails?.planData?.planName}</p>
            <p>Amount: ${paymentDetails?.amount}</p>
            <p>Status: {paymentDetails?.status}</p>
            <p className="text-sm">ID: {paymentDetails?.id}</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded-md">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Your payment has been processed successfully. 
              You will receive a confirmation email shortly.
            </p>
          </div>
          <button 
            onClick={resetPaymentState}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#1E2A38] py-12 px-4">
        <div className="max-w-md mx-auto p-6 bg-red-100 rounded-lg shadow-lg text-center">
          <div className="text-red-600 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
          <p className="text-red-700 mb-4">{paymentError}</p>
          <button 
            onClick={resetPaymentState}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2A38] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <StripeCheckoutForm
          planData={planData}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    </div>
  );
};

export default PaymentPage;