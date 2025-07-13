'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { QUESTION_TYPES } from '@/lib/constants';
import { Question, QuestionInputType } from '@/lib/types';

interface QuestionEditorPanelProps {
  currentQuestion: Question | null;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

export default function QuestionEditorPanel({
  currentQuestion,
  onUpdate,
  onDelete,
}: QuestionEditorPanelProps) {
  return (
    <div className="w-80 bg-white border-l overflow-y-auto">
      <div className="p-4">
        {currentQuestion ? (
          <QuestionEditor
            question={currentQuestion}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">Select a question to edit</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuestionEditorProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

function QuestionEditor({ question, onUpdate, onDelete }: QuestionEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Edit Question</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="question-title">Question Title</Label>
          <Input
            id="question-title"
            value={question.title}
            onChange={e => onUpdate({ title: e.target.value })}
            placeholder="Enter your question..."
          />
        </div>

        <div>
          <Label htmlFor="question-description">Description (Optional)</Label>
          <Textarea
            id="question-description"
            value={question.description || ''}
            onChange={e => onUpdate({ description: e.target.value })}
            placeholder="Add helpful context..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="question-type">Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value: QuestionInputType) => onUpdate({ type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUESTION_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="required-switch">Required</Label>
            <p className="text-xs text-gray-600">Users must answer this question</p>
          </div>
          <Switch
            id="required-switch"
            checked={question.required}
            onCheckedChange={checked => onUpdate({ required: checked })}
          />
        </div>
      </div>
    </div>
  );
}