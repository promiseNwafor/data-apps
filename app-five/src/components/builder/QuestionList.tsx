'use client';

import { useForm } from '@/contexts/FormContext';
import { FormActions } from '@/types/formActions';
import { Button } from '@/components/ui/button';
import { QUESTION_TYPES } from '@/constants/questionTypes';
import { GripVertical, Trash2 } from 'lucide-react';

export default function QuestionList() {
  const { currentForm, selectedQuestionId, dispatch } = useForm();

  if (!currentForm || currentForm.questions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">No questions yet</p>
        <p className="text-xs mt-1">Add a question to get started</p>
      </div>
    );
  }

  const handleQuestionSelect = (questionId: string) => {
    dispatch({ 
      type: FormActions.SET_SELECTED_QUESTION, 
      payload: questionId 
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    dispatch({ 
      type: FormActions.DELETE_QUESTION, 
      payload: questionId 
    });
  };

  const getQuestionTypeInfo = (type: string) => {
    return QUESTION_TYPES.find(qt => qt.id === type) || QUESTION_TYPES[0];
  };

  return (
    <div className="p-2">
      {currentForm.questions.map((question, index) => {
        const typeInfo = getQuestionTypeInfo(question.type);
        const Icon = typeInfo.icon;
        const isSelected = selectedQuestionId === question.id;

        return (
          <div
            key={question.id}
            className={`mb-2 p-3 rounded-lg border cursor-pointer transition-colors group ${
              isSelected 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleQuestionSelect(question.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 mt-1">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600 min-w-[20px]">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded ${typeInfo.color}`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {typeInfo.label}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-gray-900 truncate">
                  {question.title}
                </p>
                
                {question.description && (
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {question.description}
                  </p>
                )}
                
                {question.required && (
                  <span className="text-xs text-red-600 mt-1 inline-block">
                    Required
                  </span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 hover:text-red-600 p-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteQuestion(question.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}