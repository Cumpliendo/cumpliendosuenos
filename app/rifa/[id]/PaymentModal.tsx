
'use client';

import { useState } from 'react';

interface PaymentModalProps {
  selectedNumbers: number[];
  totalAmount: number;
  rifaName: string;
  onClose: () => void;
}

export default function PaymentModal({ 
  selectedNumbers, 
  totalAmount, 
  rifaName, 
  onClose 
}: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    email: '',
    phone: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleCardSelection = () => {
    setPaymentMethod('card');
    setShowCardForm(true);
  };

  const handleCardInput = (field: string, value: string) => {
    if (field === 'number') {
      value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substr(0, 19);
    } else if (field === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
    } else if (field === 'cvv') {
      value = value.replace(/\D/g, '').substr(0, 4);
    }
    
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!paymentMethod || !cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv || !cardData.email) {
      alert('Please complete all required fields');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate sending notifications to support
    console.log('🔔 Notification sent to soporte@rifalucky.com: New purchase - ' + selectedNumbers.length + ' numbers - $' + totalAmount);
    console.log('📱 WhatsApp notification sent to +525512345678: New purchase completed');
    
    setCurrentStep(3);
    setProcessing(false);
  };

  const formatNumbers = (numbers: number[]) => {
    return numbers.map(n => n.toString().padStart(4, '0')).join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {currentStep === 1 && 'Confirm Purchase'}
            {currentStep === 2 && 'Payment Method'}
            {currentStep === 3 && 'Purchase Successful!'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 80px)'}}>
          {/* Step 1: Confirmation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{rifaName}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected numbers:</span>
                    <span className="font-bold text-gray-900">{selectedNumbers.length}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-mono">{formatNumbers(selectedNumbers)}</p>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total amount:</span>
                    <span className="font-bold text-green-600">${totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-yellow-600 text-xl"></i>
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-1">Important information</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Numbers are reserved for 15 minutes</li>
                      <li>• Draw will be held on the indicated date</li>
                      <li>• You will receive email confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg !rounded-button"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleCardSelection}
                    className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 transition-all duration-200 ${
                      paymentMethod === 'card' 
                        ? 'border-blue-500 bg-blue-50 transform scale-105' 
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <i className="ri-bank-card-line text-2xl text-blue-600"></i>
                    <div className="flex-1 text-left">
                      <span className="font-bold text-gray-900 block">Credit/Debit Card</span>
                      <span className="text-sm text-gray-600">Visa, Mastercard, American Express</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <i className="ri-check-line text-blue-600 text-xl"></i>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setPaymentMethod('paypal');
                      setShowCardForm(false);
                    }}
                    className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 transition-all duration-200 ${
                      paymentMethod === 'paypal' 
                        ? 'border-blue-500 bg-blue-50 transform scale-105' 
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <i className="ri-paypal-line text-2xl text-blue-600"></i>
                    <div className="flex-1 text-left">
                      <span className="font-bold text-gray-900 block">PayPal</span>
                      <span className="text-sm text-gray-600">Pay with your PayPal account</span>
                    </div>
                    {paymentMethod === 'paypal' && (
                      <i className="ri-check-line text-blue-600 text-xl"></i>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setPaymentMethod('oxxo');
                      setShowCardForm(false);
                    }}
                    className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 transition-all duration-200 ${
                      paymentMethod === 'oxxo' 
                        ? 'border-red-500 bg-red-50 transform scale-105' 
                        : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-25'
                    }`}
                  >
                    <i className="ri-store-2-line text-2xl text-red-600"></i>
                    <div className="flex-1 text-left">
                      <span className="font-bold text-gray-900 block">OXXO</span>
                      <span className="text-sm text-gray-600">Pay in cash at OXXO stores</span>
                    </div>
                    {paymentMethod === 'oxxo' && (
                      <i className="ri-check-line text-red-600 text-xl"></i>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Form */}
              {showCardForm && paymentMethod === 'card' && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-secure-payment-line text-blue-600"></i>
                      <span className="font-bold text-blue-800">Secure Payment Form</span>
                    </div>
                    <p className="text-sm text-blue-700">Your card information is encrypted and secure</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => handleCardInput('number', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-4 border border-gray-300 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                      placeholder="JOHN DOE"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => handleCardInput('expiry', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-4 border border-gray-300 rounded-xl font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => handleCardInput('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full p-4 border border-gray-300 rounded-xl font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={cardData.email}
                      onChange={(e) => setCardData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={cardData.phone}
                      onChange={(e) => setCardData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+52 123 456 7890"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              )}

              {/* PayPal Form */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
                    <i className="ri-paypal-line text-blue-600 text-4xl mb-3"></i>
                    <h4 className="font-bold text-gray-900 mb-2">Pay with PayPal</h4>
                    <p className="text-gray-600 text-sm">You will be redirected to PayPal to complete your payment</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={cardData.email}
                      onChange={(e) => setCardData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              )}

              {/* OXXO Form */}
              {paymentMethod === 'oxxo' && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 text-center border border-red-200">
                    <i className="ri-store-2-line text-red-600 text-4xl mb-3"></i>
                    <h4 className="font-bold text-gray-900 mb-2">Pay at OXXO</h4>
                    <p className="text-gray-600 text-sm">Generate a payment reference and pay in cash at any OXXO store</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={cardData.email}
                      onChange={(e) => setCardData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={cardData.phone}
                      onChange={(e) => setCardData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+52 123 456 7890"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    />
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="ri-shield-check-line text-green-600"></i>
                  <span className="font-bold text-green-800">100% Secure Payment</span>
                </div>
                <p className="text-sm text-green-700">
                  Your data is protected with 256-bit SSL encryption
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing || !paymentMethod || !cardData.email}
                className={`w-full py-4 rounded-2xl font-bold text-lg !rounded-button transition-all duration-200 ${
                  processing 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105'
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Pay $${totalAmount.toLocaleString()}`
                )}
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-check-line text-green-600 text-4xl"></i>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Purchase Successful!</h3>
                <p className="text-gray-600">
                  You have acquired {selectedNumbers.length} numbers for {rifaName}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Your lucky numbers:</h4>
                <p className="font-mono text-lg text-blue-600 mb-4">
                  {formatNumbers(selectedNumbers)}
                </p>
                <p className="text-sm text-gray-600">
                  We have sent confirmation to {cardData.email}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-2">
                  <i className="ri-notification-3-line text-green-600"></i>
                  <p className="text-green-800 text-sm">
                    <strong>Automatic notifications sent:</strong> Purchase confirmed to support team via email and WhatsApp
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold !rounded-button"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
