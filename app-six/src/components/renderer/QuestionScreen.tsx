"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Question, QuestionType } from "@/types";
import QuestionInput from "./QuestionInput";

interface QuestionScreenProps {
  question: Question;
  answer: string;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionScreen({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLast,
  questionNumber,
  totalQuestions
}: QuestionScreenProps) {
  const [localAnswer, setLocalAnswer] = useState(answer);

  useEffect(() => {
    setLocalAnswer(answer);
  }, [answer]);

  const handleAnswerChange = (value: string) => {
    setLocalAnswer(value);
    onAnswer(question.id, value);
  };

  const handleNext = () => {
    if (question.required && !localAnswer.trim()) {
      return; // Don't proceed if required field is empty
    }
    onNext();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const canProceed = !question.required || localAnswer.trim().length > 0;

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto">
      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            {questionNumber} of {totalQuestions}
          </span>
          {question.required && (
            <span className="text-sm text-red-500">* Required</span>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {question.title}
        </h1>
        
        {question.description && (
          <p className="text-gray-600 mb-6">
            {question.description}
          </p>
        )}
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <QuestionInput
          question={question}
          value={localAnswer}
          onChange={handleAnswerChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {canGoBack && (
            <Button
              variant="ghost"
              onClick={onPrevious}
              className="text-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="h-12 px-8"
        >
          {isLast ? "Submit" : "Next"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Keyboard hint */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Press Enter to continue {question.type === QuestionType.YESNO ? "• Y for Yes, N for No" : ""}
        </p>
      </div>
    </div>
  );
}