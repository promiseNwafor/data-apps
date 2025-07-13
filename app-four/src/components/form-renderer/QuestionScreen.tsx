'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Question } from '@/lib/types';
import { getInputPlaceholder, getInputType, canProceed } from '@/lib/utils/form-renderer-utils';

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answer: string;
  onAnswerChange: (value: string) => void;
  onNext: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  onNext,
  onKeyPress,
  isSubmitting = false,
  submitError = null,
}: QuestionScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [questionIndex]);


  return (
    <motion.div
      key={`question-${questionIndex}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col justify-center min-h-screen px-6 py-12"
    >
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="mb-2">
            <span className="text-sm text-blue-600 font-medium">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {question.title}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </h2>
          
          {question.description && (
            <p className="text-gray-600 mb-8 text-lg">
              {question.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              ref={inputRef}
              type={getInputType(question.type)}
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder={getInputPlaceholder(question.type)}
              className="text-xl py-6 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              autoComplete="off"
            />
            
            <motion.div
              className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: answer ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ originX: 0 }}
            />
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button
              onClick={onNext}
              disabled={!canProceed(question, answer) || isSubmitting}
              className="flex items-center gap-2 text-lg px-6 py-3"
            >
              {isSubmitting ? 'Submitting...' : 'OK'}
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            {!isSubmitting && (
              <span className="text-sm text-gray-500">
                press Enter ↵
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}