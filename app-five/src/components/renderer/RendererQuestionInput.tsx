'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { QuestionType } from '@/types/questionTypes';
import { Question } from '@/types/form';

interface RendererQuestionInputProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function RendererQuestionInput({ question, value, onChange }: RendererQuestionInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleMultipleChoice = (selectedValue: string) => {
    onChange(selectedValue);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValues, option]);
    } else {
      onChange(currentValues.filter(v => v !== option));
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <Input
          type="text"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Type your answer..."
          className="text-lg py-3"
          autoFocus
        />
      );

    case QuestionType.EMAIL:
      return (
        <Input
          type="email"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Enter your email address..."
          className="text-lg py-3"
          autoFocus
        />
      );

    case QuestionType.NUMBER:
      return (
        <Input
          type="number"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Enter a number..."
          className="text-lg py-3"
          autoFocus
        />
      );

    case QuestionType.PHONE:
      return (
        <Input
          type="tel"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Enter your phone number..."
          className="text-lg py-3"
          autoFocus
        />
      );

    case QuestionType.URL:
      return (
        <Input
          type="url"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Enter a website URL..."
          className="text-lg py-3"
          autoFocus
        />
      );

    case QuestionType.TEXTAREA:
      return (
        <Textarea
          value={value as string}
          onChange={handleInputChange}
          placeholder="Type your answer..."
          className="text-lg py-3 min-h-[120px]"
          autoFocus
        />
      );

    case QuestionType.MULTIPLE_CHOICE:
      return (
        <div className="space-y-3">
          {(question.options || []).map((option, index) => (
            <Button
              key={index}
              variant={value === option ? "default" : "outline"}
              className={`w-full p-4 text-left justify-start text-base h-auto transition-all hover:scale-105 ${
                value === option ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleMultipleChoice(option)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  value === option ? 'bg-white border-white' : 'border-gray-300'
                }`} />
                {option}
              </div>
            </Button>
          ))}
        </div>
      );

    case QuestionType.CHECKBOX:
      const checkboxValues = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {(question.options || []).map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={`option-${index}`}
                checked={checkboxValues.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
              />
              <Label htmlFor={`option-${index}`} className="text-base font-normal cursor-pointer flex-1">
                {option}
              </Label>
            </div>
          ))}
        </div>
      );

    case QuestionType.DROPDOWN:
      return (
        <Select value={value as string} onValueChange={handleSelectChange}>
          <SelectTrigger className="text-lg py-6">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent>
            {(question.options || []).map((option, index) => (
              <SelectItem key={index} value={option} className="text-base py-3">
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
          value={value as string}
          onChange={handleInputChange}
          className="text-lg py-3"
          autoFocus
        />
      );

    default:
      return (
        <Input
          type="text"
          value={value as string}
          onChange={handleInputChange}
          placeholder="Type your answer..."
          className="text-lg py-3"
          autoFocus
        />
      );
  }
}