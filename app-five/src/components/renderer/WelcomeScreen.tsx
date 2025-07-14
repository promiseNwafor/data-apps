'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, HelpCircle } from 'lucide-react';
import { Form } from '@/types/form';

interface WelcomeScreenProps {
  form: Form;
  onStart: () => void;
}

export default function WelcomeScreen({ form, onStart }: WelcomeScreenProps) {
  const estimatedTime = Math.ceil(form.questions.length * 0.5); // 30 seconds per question

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {form.title}
        </h1>
        
        {form.description && (
          <p className="text-gray-600 mb-4">
            {form.description}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>{form.questions.length} question{form.questions.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~{estimatedTime} min{estimatedTime !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3"
          size="lg"
        >
          Start Form
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-gray-500">
          Press Enter to navigate between questions
        </p>
      </div>
    </div>
  );
}