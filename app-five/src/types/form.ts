import { QuestionType } from './questionTypes';
import { FormActions } from './formActions';

export interface Question {
  id: string;
  formId: string;
  order: number;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormState {
  currentForm: Form | null;
  selectedQuestionId: string | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
}

export type FormAction = 
  | { type: FormActions.SET_FORM; payload: Form }
  | { type: FormActions.SET_LOADING; payload: boolean }
  | { type: FormActions.SET_ERROR; payload: string | null }
  | { type: FormActions.SET_SELECTED_QUESTION; payload: string | null }
  | { type: FormActions.ADD_QUESTION; payload: Question }
  | { type: FormActions.UPDATE_QUESTION; payload: { id: string; updates: Partial<Question> } }
  | { type: FormActions.DELETE_QUESTION; payload: string }
  | { type: FormActions.REORDER_QUESTIONS; payload: { fromIndex: number; toIndex: number } }
  | { type: FormActions.UPDATE_FORM_META; payload: { title?: string; description?: string } }
  | { type: FormActions.RESET_FORM }
  | { type: FormActions.SET_DIRTY; payload: boolean };