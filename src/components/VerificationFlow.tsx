import React, { useState } from 'react';
import { CheckCircle, Phone, CreditCard, Shield, Building2 } from 'lucide-react';
import { VerificationStep, OTPVerification } from '../types';
import { verificationSteps as initialSteps } from '../data/mockData';

interface VerificationFlowProps {
  onComplete: () => void;
}

export default function VerificationFlow({ onComplete }: VerificationFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<VerificationStep[]>(initialSteps);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [panCard, setPanCard] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const icons = {
    0: Phone,
    1: CreditCard,
    2: Shield,
    3: Building2,
  };

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      updateStepCompletion(0, true);
      setCurrentStep(1);
    }
  };

  const handlePANVerification = () => {
    if (panCard.length === 10) {
      updateStepCompletion(1, true);
      setCurrentStep(2);
    }
  };

  const handleAadharVerification = () => {
    if (aadharCard.length === 12) {
      updateStepCompletion(2, true);
      setCurrentStep(3);
    }
  };

  const handleSkipBankVerification = () => {
    onComplete();
  };

  const updateStepCompletion = (stepIndex: number, completed: boolean) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed } : step
    ));
  };

  const renderStepContent = () => {
    const Icon = icons[currentStep as keyof typeof icons];
    
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Phone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone Number</h2>
              <p className="text-gray-600">We'll send you a verification code via SMS</p>
            </div>
            
            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length !== 10}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">Use: 123456 for demo</p>
                </div>
                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your PAN Card</h2>
              <p className="text-gray-600">Enter your PAN card details for verification</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Card Number
                </label>
                <input
                  type="text"
                  value={panCard}
                  onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                <p className="text-sm text-gray-500 mt-1">Use: ABCDE1234F for demo</p>
              </div>
              <button
                onClick={handlePANVerification}
                disabled={panCard.length !== 10}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Verify PAN
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Aadhaar Card</h2>
              <p className="text-gray-600">Enter your Aadhaar card details for verification</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Card Number
                </label>
                <input
                  type="text"
                  value={aadharCard}
                  onChange={(e) => setAadharCard(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="123456789012"
                  maxLength={12}
                />
                <p className="text-sm text-gray-500 mt-1">Use: 123456789012 for demo</p>
              </div>
              <button
                onClick={handleAadharVerification}
                disabled={aadharCard.length !== 12}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Verify Aadhaar
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Complete!</h2>
              <p className="text-gray-600">Your identity has been successfully verified</p>
            </div>
            
            <button
              onClick={onComplete}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.completed 
                    ? 'bg-green-600 text-white' 
                    : index === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }
                `}>
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-0.5 mx-2
                    ${step.completed ? 'bg-green-600' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">
              {steps[currentStep]?.title}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}