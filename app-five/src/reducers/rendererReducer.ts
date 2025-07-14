import { RendererState, RendererAction, RendererActions } from '@/types/renderer';

export const initialRendererState: RendererState = {
  currentQuestionIndex: 0,
  responses: [],
  isSubmitted: false,
  isSubmitting: false,
  showWelcome: true,
};

export function rendererReducer(state: RendererState, action: RendererAction): RendererState {
  switch (action.type) {
    case RendererActions.START_FORM:
      return {
        ...state,
        showWelcome: false,
        currentQuestionIndex: 0,
      };

    case RendererActions.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case RendererActions.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case RendererActions.UPDATE_RESPONSE:
      const existingIndex = state.responses.findIndex(
        r => r.questionId === action.payload.questionId
      );
      
      const newResponses = [...state.responses];
      if (existingIndex >= 0) {
        newResponses[existingIndex] = action.payload;
      } else {
        newResponses.push(action.payload);
      }
      
      return {
        ...state,
        responses: newResponses,
      };

    case RendererActions.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case RendererActions.SUBMIT_FORM:
      return {
        ...state,
        isSubmitted: true,
        isSubmitting: false,
      };

    default:
      return state;
  }
}