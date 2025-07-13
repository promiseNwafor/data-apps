import { Type, Mail, Phone } from 'lucide-react';
import { QuestionInputType } from './types';

export interface QuestionType {
  id: QuestionInputType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const QUESTION_TYPES: QuestionType[] = [
  {
    id: 'text',
    name: 'Text',
    description: 'Short answer text input',
    icon: Type,
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Email address input with validation',
    icon: Mail,
  },
  {
    id: 'phone',
    name: 'Phone Number',
    description: 'Phone number input with validation',
    icon: Phone,
  },
];
