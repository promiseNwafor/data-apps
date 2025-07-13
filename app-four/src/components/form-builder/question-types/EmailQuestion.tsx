'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Question } from '@/lib/types';

interface EmailQuestionProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function EmailQuestion({ question, onUpdate }: EmailQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`question-title-${question.id}`}>Question Title</Label>
        <Input
          id={`question-title-${question.id}`}
          value={question.title}
          onChange={e => onUpdate({ title: e.target.value })}
          placeholder="e.g., What's your email address?"
        />
      </div>

      <div>
        <Label htmlFor={`question-description-${question.id}`}>Description (Optional)</Label>
        <Textarea
          id={`question-description-${question.id}`}
          value={question.description || ''}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder="e.g., We'll use this to send you updates..."
          rows={2}
        />
      </div>
    </div>
  );
}