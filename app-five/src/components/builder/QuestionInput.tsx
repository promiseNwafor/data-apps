'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { QuestionType } from '@/types/questionTypes';
import { Question } from '@/types/form';

interface QuestionInputProps {
  question: Question;
}

export default function QuestionInput({ question }: QuestionInputProps) {
  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <Input 
          placeholder="Type your answer here..."
          className="mt-4"
        />
      );

    case QuestionType.EMAIL:
      return (
        <Input 
          type="email"
          placeholder="Enter your email address..."
          className="mt-4"
        />
      );

    case QuestionType.NUMBER:
      return (
        <Input 
          type="number"
          placeholder="Enter a number..."
          className="mt-4"
        />
      );

    case QuestionType.PHONE:
      return (
        <Input 
          type="tel"
          placeholder="Enter your phone number..."
          className="mt-4"
        />
      );

    case QuestionType.URL:
      return (
        <Input 
          type="url"
          placeholder="Enter a website URL..."
          className="mt-4"
        />
      );

    case QuestionType.TEXTAREA:
      return (
        <Textarea 
          placeholder="Type your answer here..."
          className="mt-4 min-h-[100px]"
        />
      );

    case QuestionType.MULTIPLE_CHOICE:
      return (
        <RadioGroup className="mt-4 space-y-3">
          {(question.options || ['Option 1', 'Option 2']).map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    case QuestionType.CHECKBOX:
      return (
        <div className="mt-4 space-y-3">
          {(question.options || ['Option 1', 'Option 2']).map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`checkbox-${index}`} />
              <Label htmlFor={`checkbox-${index}`}>{option}</Label>
            </div>
          ))}
        </div>
      );

    case QuestionType.DROPDOWN:
      return (
        <Select>
          <SelectTrigger className="mt-4">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent>
            {(question.options || ['Option 1', 'Option 2']).map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case QuestionType.DATE:
      return (
        <Input 
          type="date"
          className="mt-4"
        />
      );

    default:
      return (
        <Input 
          placeholder="Type your answer here..."
          className="mt-4"
        />
      );
  }
}