'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CreateFormModal from '@/components/dashboard/CreateFormModal';
import { useState } from 'react';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@radix-ui/react-label';

interface QuestionListPanelProps {
  currentQuestionIndex: number | null;
  onSelectQuestion: (index: number) => void;
  formDescription: string;
  setFormDescription: (description: string) => void;
  onSaveMetadata: () => void;
}

export default function QuestionListPanel({
  currentQuestionIndex,
  onSelectQuestion,
  formDescription,
  setFormDescription,
  onSaveMetadata,
}: QuestionListPanelProps) {
  const { currentForm } = useForm();
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const questions = currentForm.questions || [];

  const handleAddQuestion = () => {
    setShowAddQuestionModal(true);
  };

  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Questions</h3>
          <Button
            size="sm"
            onClick={handleAddQuestion}
            className="flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add
          </Button>
        </div>
        <Label className="text-sm font-medium mb-1">Form Description</Label>
        <Textarea
          value={formDescription}
          onChange={e => setFormDescription(e.target.value)}
          onBlur={onSaveMetadata}
          placeholder="Form description..."
          className="text-sm"
          rows={2}
        />
      </div>

      <div className="p-2">
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No questions yet</p>
            <p className="text-xs mt-1">
              Click &quot;Add&quot; to create your first question
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => onSelectQuestion(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentQuestionIndex === index
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">
                        Q{index + 1}
                      </span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                        {question.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">
                      {question.title || 'Untitled question'}
                    </p>
                    {question.required && (
                      <span className="text-xs text-red-500">Required</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <CreateFormModal
        open={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        isAddingToExistingForm={true}
      />
    </div>
  );
}
