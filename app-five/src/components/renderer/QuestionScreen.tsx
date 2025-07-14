'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Question } from '@/types/form';
import { QuestionType } from '@/types/questionTypes';
import RendererQuestionInput from './RendererQuestionInput';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  currentValue?: string | string[];
  onNext: () => void;
  onPrevious?: () => void;
  onUpdateResponse: (questionId: string, value: string | string[]) => void;
  isSubmitting: boolean;
  isLastQuestion: boolean;
}

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  currentValue,
  onNext,
  onPrevious,
  onUpdateResponse,
  isSubmitting,
  isLastQuestion
}: QuestionScreenProps) {
  const [value, setValue] = useState<string | string[]>(currentValue || '');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setValue(currentValue || '');
  }, [currentValue]);

  useEffect(() => {
    // Validate the current value
    if (question.required) {
      if (Array.isArray(value)) {
        setIsValid(value.length > 0);
      } else {
        setIsValid(value.trim().length > 0);
      }
    } else {
      setIsValid(true);
    }
  }, [value, question.required]);

  const handleValueChange = (newValue: string | string[]) => {
    setValue(newValue);
    onUpdateResponse(question.id, newValue);
  };

  const handleNext = () => {
    if (isValid || !question.required) {
      onNext();
    }
  };

  // Auto-advance for single-click questions (multiple choice, etc.)
  const handleAutoAdvance = (newValue: string | string[]) => {
    handleValueChange(newValue);
    
    // Auto-advance for single-select questions
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      setTimeout(() => {
        onNext();
      }, 300); // Small delay for visual feedback
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Question Header */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {question.title}
          {question.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </h2>
        
        {question.description && (
          <p className="text-gray-600 text-sm">
            {question.description}
          </p>
        )}
      </div>

      {/* Question Input */}
      <div className="mb-8">
        <RendererQuestionInput
          question={question}
          value={value}
          onChange={question.type === QuestionType.MULTIPLE_CHOICE ? handleAutoAdvance : handleValueChange}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {onPrevious && (
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {question.required && !isValid && (
            <span className="text-sm text-red-500">
              This field is required
            </span>
          )}
          
          <Button
            onClick={handleNext}
            disabled={question.required && !isValid || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : isLastQuestion ? (
              'Submit'
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Press Enter to continue
        </p>
      </div>
    </div>
  );
}