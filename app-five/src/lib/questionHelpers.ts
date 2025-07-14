import { QuestionType } from '@/types/questionTypes';
import { Question } from '@/types/form';

export function createNewQuestion(type: QuestionType, formId: string, order: number): Question {
  const baseQuestion: Question = {
    id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    formId,
    order,
    type,
    title: `Untitled ${type.toLowerCase()} question`,
    description: '',
    required: false,
  };

  // Add default options for choice-based questions
  if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOX, QuestionType.DROPDOWN].includes(type)) {
    baseQuestion.options = ['Option 1', 'Option 2'];
  }

  return baseQuestion;
}