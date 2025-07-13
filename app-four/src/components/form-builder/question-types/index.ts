import TextQuestion from './TextQuestion';
import EmailQuestion from './EmailQuestion';
import PhoneQuestion from './PhoneQuestion';
import { QuestionInputType } from '@/lib/types';

export const QUESTION_COMPONENTS = {
  text: TextQuestion,
  email: EmailQuestion,
  phone: PhoneQuestion,
} as const;

export function getQuestionComponent(type: QuestionInputType) {
  return QUESTION_COMPONENTS[type];
}
