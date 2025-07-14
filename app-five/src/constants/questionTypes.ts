import { 
  Type, 
  Mail, 
  Hash, 
  CheckSquare, 
  Square, 
  ChevronDown, 
  FileText, 
  Calendar, 
  Phone, 
  Link 
} from 'lucide-react';
import { QuestionType } from '@/types/questionTypes';

export const QUESTION_TYPES = [
  {
    id: QuestionType.TEXT,
    label: 'Short Text',
    description: 'Single line text input',
    icon: Type,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    id: QuestionType.EMAIL,
    label: 'Email',
    description: 'Email address input',
    icon: Mail,
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    id: QuestionType.NUMBER,
    label: 'Number',
    description: 'Numeric input',
    icon: Hash,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    id: QuestionType.MULTIPLE_CHOICE,
    label: 'Multiple Choice',
    description: 'Select one option',
    icon: CheckSquare,
    color: 'bg-orange-50 text-orange-600 border-orange-200'
  },
  {
    id: QuestionType.CHECKBOX,
    label: 'Checkbox',
    description: 'Select multiple options',
    icon: Square,
    color: 'bg-pink-50 text-pink-600 border-pink-200'
  },
  {
    id: QuestionType.DROPDOWN,
    label: 'Dropdown',
    description: 'Select from dropdown',
    icon: ChevronDown,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  },
  {
    id: QuestionType.TEXTAREA,
    label: 'Long Text',
    description: 'Multi-line text input',
    icon: FileText,
    color: 'bg-teal-50 text-teal-600 border-teal-200'
  },
  {
    id: QuestionType.DATE,
    label: 'Date',
    description: 'Date picker',
    icon: Calendar,
    color: 'bg-red-50 text-red-600 border-red-200'
  },
  {
    id: QuestionType.PHONE,
    label: 'Phone',
    description: 'Phone number input',
    icon: Phone,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  },
  {
    id: QuestionType.URL,
    label: 'Website',
    description: 'URL input',
    icon: Link,
    color: 'bg-gray-50 text-gray-600 border-gray-200'
  }
] as const;