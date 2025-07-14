
export interface FormResponse {
  questionId: string;
  value: string | string[];
}

export interface RendererState {
  currentQuestionIndex: number;
  responses: FormResponse[];
  isSubmitted: boolean;
  isSubmitting: boolean;
  showWelcome: boolean;
}

export enum RendererActions {
  NEXT_QUESTION = 'NEXT_QUESTION',
  PREVIOUS_QUESTION = 'PREVIOUS_QUESTION',
  UPDATE_RESPONSE = 'UPDATE_RESPONSE',
  START_FORM = 'START_FORM',
  SUBMIT_FORM = 'SUBMIT_FORM',
  SET_SUBMITTING = 'SET_SUBMITTING'
}

export type RendererAction = 
  | { type: RendererActions.NEXT_QUESTION }
  | { type: RendererActions.PREVIOUS_QUESTION }
  | { type: RendererActions.UPDATE_RESPONSE; payload: FormResponse }
  | { type: RendererActions.START_FORM }
  | { type: RendererActions.SUBMIT_FORM }
  | { type: RendererActions.SET_SUBMITTING; payload: boolean };