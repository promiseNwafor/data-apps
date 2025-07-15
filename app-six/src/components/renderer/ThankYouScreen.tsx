"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Form } from "@/types";

interface ThankYouScreenProps {
  form: Form;
}

export default function ThankYouScreen({ form }: ThankYouScreenProps) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-lg mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          Your response has been submitted successfully. We appreciate you taking the time to complete this form.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-500">
          Form: <span className="font-medium text-gray-700">{form.title}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Submitted: <span className="font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
        </p>
      </div>

      <Button 
        variant="outline" 
        onClick={() => window.close()}
        className="w-full"
      >
        Close
      </Button>
    </div>
  );
}