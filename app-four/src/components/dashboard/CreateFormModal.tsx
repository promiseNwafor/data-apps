'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QUESTION_TYPES } from '@/lib/constants';
import { useForm } from '@/contexts/FormContext';
import { FormActionType, FormStep, QuestionInputType, Question } from '@/lib/types';

interface CreateFormModalProps {
  open: boolean;
  onClose: () => void;
  isAddingToExistingForm?: boolean;
}

export default function CreateFormModal({
  open,
  onClose,
  isAddingToExistingForm = false,
}: CreateFormModalProps) {
  const { dispatch } = useForm();
  const [selectedType, setSelectedType] = useState<QuestionInputType | null>(
    null
  );

  const handleContinue = () => {
    if (selectedType) {
      // Create the first question with the selected type
      const newQuestion: Question = {
        id: `question-${Date.now()}`,
        type: selectedType,
        title: '',
        description: '',
        required: false,
      };

      dispatch({
        type: FormActionType.SET_QUESTION_TYPE,
        payload: selectedType,
      });
      dispatch({
        type: FormActionType.ADD_QUESTION,
        payload: newQuestion,
      });
      
      // Only navigate to builder if this is the first question
      if (!isAddingToExistingForm) {
        dispatch({
          type: FormActionType.SET_CURRENT_STEP,
          payload: FormStep.BUILDER,
        });
      }
      setSelectedType(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            Choose a question type to start building your form
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {QUESTION_TYPES.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                className={`w-full p-4 border rounded-lg text-left transition-all hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-md ${
                      selectedType === type.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                  {selectedType === type.id && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
