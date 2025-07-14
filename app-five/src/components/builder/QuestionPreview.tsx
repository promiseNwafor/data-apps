'use client';

import { useForm } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import QuestionInput from './QuestionInput';

export default function QuestionPreview() {
  const { currentForm, selectedQuestionId } = useForm();

  if (!currentForm || !selectedQuestionId) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <p className="text-gray-500">Select a question to see the preview</p>
      </div>
    );
  }

  const selectedQuestion = currentForm.questions.find(q => q.id === selectedQuestionId);

  if (!selectedQuestion) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <p className="text-gray-500">Question not found</p>
      </div>
    );
  }

  const currentIndex = currentForm.questions.findIndex(q => q.id === selectedQuestionId);
  const totalQuestions = currentForm.questions.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {selectedQuestion.title}
          {selectedQuestion.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </h2>
        
        {selectedQuestion.description && (
          <p className="text-gray-600 text-sm">
            {selectedQuestion.description}
          </p>
        )}
      </div>

      {/* Question input */}
      <div className="mb-6">
        <QuestionInput question={selectedQuestion} />
      </div>

      {/* Continue button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          {currentIndex < totalQuestions - 1 ? (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </div>
  );
}