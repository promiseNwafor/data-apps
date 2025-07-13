export type QuestionInputType = 'text' | 'email' | 'phone';

export interface Question {
  id: string;
  type: QuestionInputType;
  title: string;
  description?: string;
  required: boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  responses?: number; // For display purposes only, not stored
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export enum FormStep {
  DASHBOARD = 'dashboard',
  BUILDER = 'builder',
  RENDERER = 'renderer',
}

export interface FormState {
  currentForm: Partial<Form>;
  selectedQuestionType: QuestionInputType | null;
  currentStep: FormStep;
  isEditing: boolean;
}

export enum FormActionType {
  SET_QUESTION_TYPE = 'SET_QUESTION_TYPE',
  SET_CURRENT_STEP = 'SET_CURRENT_STEP',
  SET_FORM_METADATA = 'SET_FORM_METADATA',
  ADD_QUESTION = 'ADD_QUESTION',
  UPDATE_QUESTION = 'UPDATE_QUESTION',
  DELETE_QUESTION = 'DELETE_QUESTION',
  RESET_FORM = 'RESET_FORM',
  LOAD_FORM = 'LOAD_FORM',
}

export type FormAction =
  | { type: FormActionType.SET_QUESTION_TYPE; payload: QuestionInputType }
  | { type: FormActionType.SET_CURRENT_STEP; payload: FormStep }
  | {
      type: FormActionType.SET_FORM_METADATA;
      payload: { title: string; description: string };
    }
  | { type: FormActionType.ADD_QUESTION; payload: Question }
  | {
      type: FormActionType.UPDATE_QUESTION;
      payload: { id: string; question: Partial<Question> };
    }
  | { type: FormActionType.DELETE_QUESTION; payload: string }
  | { type: FormActionType.RESET_FORM }
  | { type: FormActionType.LOAD_FORM; payload: Form };
