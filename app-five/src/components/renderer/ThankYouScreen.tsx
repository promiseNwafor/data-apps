'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Form } from '@/types/form';

interface ThankYouScreenProps {
  form: Form;
}

export default function ThankYouScreen({ form }: ThankYouScreenProps) {
  const handleNewResponse = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thank You!
        </h1>
        
        <p className="text-gray-600">
          Your response to &ldquo;{form.title}&rdquo; has been submitted successfully.
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          ✓ Form submitted at {new Date().toLocaleTimeString()}
        </p>
      </div>

      <Button 
        onClick={handleNewResponse}
        variant="outline"
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Submit Another Response
      </Button>
    </div>
  );
}