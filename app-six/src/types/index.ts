export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  order: number;
  formId: string;
  createdAt?: Date;
  updatedAt?: Date;
  options?: string[]; // For multiple choice, dropdown, etc.
}

export enum QuestionType {
  TEXT = "TEXT",
  EMAIL = "EMAIL", 
  NUMBER = "NUMBER",
  PHONE = "PHONE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  DATE = "DATE",
  RATING = "RATING",
  YESNO = "YESNO"
}

export interface FormBuilderState {
  form: Form | null;
  questions: Question[];
  selectedQuestionId: string | null;
  isLoading: boolean;
  isSaving: boolean;
}

export enum FormBuilderActionType {
  SET_FORM = "SET_FORM",
  SET_QUESTIONS = "SET_QUESTIONS",
  ADD_QUESTION = "ADD_QUESTION",
  UPDATE_QUESTION = "UPDATE_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  SELECT_QUESTION = "SELECT_QUESTION",
  SET_LOADING = "SET_LOADING",
  SET_SAVING = "SET_SAVING",
  REORDER_QUESTIONS = "REORDER_QUESTIONS"
}

export type FormBuilderAction =
  | { type: FormBuilderActionType.SET_FORM; payload: Form }
  | { type: FormBuilderActionType.SET_QUESTIONS; payload: Question[] }
  | { type: FormBuilderActionType.ADD_QUESTION; payload: Question }
  | { type: FormBuilderActionType.UPDATE_QUESTION; payload: Question }
  | { type: FormBuilderActionType.DELETE_QUESTION; payload: string }
  | { type: FormBuilderActionType.SELECT_QUESTION; payload: string | null }
  | { type: FormBuilderActionType.SET_LOADING; payload: boolean }
  | { type: FormBuilderActionType.SET_SAVING; payload: boolean }
  | { type: FormBuilderActionType.REORDER_QUESTIONS; payload: Question[] };