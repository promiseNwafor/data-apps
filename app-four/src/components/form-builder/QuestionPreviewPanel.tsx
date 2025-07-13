'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Question } from '@/lib/types';

interface QuestionPreviewPanelProps {
  currentQuestion: Question | null;
}

export default function QuestionPreviewPanel({ currentQuestion }: QuestionPreviewPanelProps) {
  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <p className="text-sm text-gray-600">
              This is how your question will appear to users
            </p>
          </div>

          {currentQuestion ? (
            <QuestionPreview question={currentQuestion} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Select a question to preview it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuestionPreviewProps {
  question: Question;
}

function QuestionPreview({ question }: QuestionPreviewProps) {
  return (
    <div className="border rounded-lg p-6 bg-gray-50">
      <div className="mb-4">
        <Label className="text-base font-medium">
          {question.title || 'Question title'}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {question.description && (
          <p className="text-sm text-gray-600 mt-1">{question.description}</p>
        )}
      </div>
      
      {/* Mock input based on question type */}
      {question.type === 'text' && (
        <Input placeholder="Your answer..." disabled />
      )}
      {question.type === 'email' && (
        <Input type="email" placeholder="your@email.com" disabled />
      )}
      {question.type === 'phone' && (
        <Input type="tel" placeholder="+1 (555) 123-4567" disabled />
      )}
    </div>
  );
}