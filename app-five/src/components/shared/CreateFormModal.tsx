'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QUESTION_TYPES } from '@/constants/questionTypes';
import { QuestionType } from '@/types/questionTypes';
import { createFormWithFirstQuestion } from '@/actions/formActions';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/contexts/FormContext';
import { FormActions } from '@/types/formActions';
import { createNewQuestion } from '@/lib/questionHelpers';

interface CreateFormModalProps {
  mode: 'create' | 'add';
  trigger: React.ReactNode;
}

export default function CreateFormModal({
  mode,
  trigger,
}: CreateFormModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { currentForm, dispatch } = useForm();

  const handleQuestionTypeSelect = (questionType: QuestionType) => {
    if (mode === 'add') {
      handleAddQuestion(questionType);
      return;
    }
    
    setSelectedQuestionType(questionType);
  };

  const handleAddQuestion = (questionType: QuestionType) => {
    if (!currentForm) return;
    
    const newQuestion = createNewQuestion(
      questionType, 
      currentForm.id, 
      currentForm.questions.length + 1
    );
    
    dispatch({ type: FormActions.ADD_QUESTION, payload: newQuestion });
    setOpen(false);
  };

  const handleContinue = () => {
    if (!selectedQuestionType) return;
    
    startTransition(async () => {
      const result = await createFormWithFirstQuestion(selectedQuestionType);
      if (result.success) {
        router.push(`/builder/${result.formId}`);
      } else {
        console.error('Failed to create form:', result.error);
      }
    });
  };

  const resetModal = () => {
    setSelectedQuestionType(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setSelectedQuestionType(null);
      }
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="lg:min-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Form' : 'Add Question'}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-6">
            {mode === 'create'
              ? 'Select a question type to start building your form'
              : 'Choose the type of question you want to add'}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {QUESTION_TYPES.map(questionType => {
              const Icon = questionType.icon;
              const isSelected = selectedQuestionType === questionType.id;
              return (
                <Button
                  key={questionType.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={`h-auto p-4 flex flex-col items-center gap-3 transition-colors ${
                    isSelected 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : `hover:${questionType.color}`
                  }`}
                  onClick={() => handleQuestionTypeSelect(questionType.id)}
                  disabled={isPending}
                >
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-blue-500 text-white' : questionType.color
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">
                      {questionType.label}
                    </div>
                    <div className={`text-xs mt-1 ${
                      isSelected ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {questionType.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {mode === 'create' && selectedQuestionType && (
            <div className="mt-6 pt-6 border-t flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={resetModal}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {mode === 'add' && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center">
                Click any question type to add it to your form
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
