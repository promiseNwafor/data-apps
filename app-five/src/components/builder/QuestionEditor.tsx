'use client';

import { useForm } from '@/contexts/FormContext';
import { FormActions } from '@/types/formActions';
import { QuestionType } from '@/types/questionTypes';
import { QUESTION_TYPES } from '@/constants/questionTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

export default function QuestionEditor() {
  const { currentForm, selectedQuestionId, dispatch } = useForm();

  if (!currentForm || !selectedQuestionId) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-sm">Select a question to edit</p>
      </div>
    );
  }

  const selectedQuestion = currentForm.questions.find(q => q.id === selectedQuestionId);

  if (!selectedQuestion) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-sm">Question not found</p>
      </div>
    );
  }

  const updateQuestion = (updates: Partial<typeof selectedQuestion>) => {
    dispatch({
      type: FormActions.UPDATE_QUESTION,
      payload: { id: selectedQuestionId, updates }
    });
  };

  const handleTypeChange = (newType: QuestionType) => {
    const updates: Partial<typeof selectedQuestion> = { type: newType };
    
    // Add default options for choice-based questions
    if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOX, QuestionType.DROPDOWN].includes(newType)) {
      updates.options = selectedQuestion.options || ['Option 1', 'Option 2'];
    } else {
      updates.options = undefined;
    }
    
    updateQuestion(updates);
  };

  const addOption = () => {
    const currentOptions = selectedQuestion.options || [];
    updateQuestion({
      options: [...currentOptions, `Option ${currentOptions.length + 1}`]
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(selectedQuestion.options || [])];
    newOptions[index] = value;
    updateQuestion({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = selectedQuestion.options?.filter((_, i) => i !== index) || [];
    updateQuestion({ options: newOptions });
  };

  const hasOptions = [QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOX, QuestionType.DROPDOWN]
    .includes(selectedQuestion.type);

  return (
    <div className="p-6 space-y-6">
      {/* Question Type */}
      <div className="space-y-2">
        <Label htmlFor="question-type">Question Type</Label>
        <Select value={selectedQuestion.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {QUESTION_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Question Title */}
      <div className="space-y-2">
        <Label htmlFor="question-title">Question Title</Label>
        <Input
          id="question-title"
          value={selectedQuestion.title}
          onChange={(e) => updateQuestion({ title: e.target.value })}
          placeholder="Enter your question..."
        />
      </div>

      {/* Question Description */}
      <div className="space-y-2">
        <Label htmlFor="question-description">Description (Optional)</Label>
        <Textarea
          id="question-description"
          value={selectedQuestion.description || ''}
          onChange={(e) => updateQuestion({ description: e.target.value })}
          placeholder="Add a description or help text..."
          rows={3}
        />
      </div>

      {/* Required Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Required Question</Label>
          <p className="text-sm text-gray-500">
            Users must answer this question to continue
          </p>
        </div>
        <Switch
          checked={selectedQuestion.required}
          onCheckedChange={(checked) => updateQuestion({ required: checked })}
        />
      </div>

      {/* Options (for choice-based questions) */}
      {hasOptions && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Options</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addOption}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </Button>
          </div>
          
          <div className="space-y-2">
            {(selectedQuestion.options || []).map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {selectedQuestion.options && selectedQuestion.options.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}