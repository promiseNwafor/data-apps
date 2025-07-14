import { FormState, FormAction } from '@/types/form';
import { FormActions } from '@/types/formActions';

export const initialFormState: FormState = {
  currentForm: null,
  selectedQuestionId: null,
  isLoading: false,
  error: null,
  isDirty: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case FormActions.SET_FORM:
      return {
        ...state,
        currentForm: action.payload,
        selectedQuestionId: action.payload.questions[0]?.id || null,
        isLoading: false,
        error: null,
        isDirty: false,
      };

    case FormActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case FormActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case FormActions.SET_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestionId: action.payload,
      };

    case FormActions.ADD_QUESTION:
      if (!state.currentForm) return state;
      
      const newQuestions = [...state.currentForm.questions, action.payload].sort(
        (a, b) => a.order - b.order
      );
      
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: newQuestions,
        },
        selectedQuestionId: action.payload.id,
        isDirty: true,
      };

    case FormActions.UPDATE_QUESTION:
      if (!state.currentForm) return state;
      
      const updatedQuestions = state.currentForm.questions.map(question =>
        question.id === action.payload.id
          ? { ...question, ...action.payload.updates }
          : question
      );
      
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: updatedQuestions,
        },
        isDirty: true,
      };

    case FormActions.DELETE_QUESTION:
      if (!state.currentForm) return state;
      
      const filteredQuestions = state.currentForm.questions.filter(
        question => question.id !== action.payload
      );
      
      const newSelectedId = state.selectedQuestionId === action.payload
        ? filteredQuestions[0]?.id || null
        : state.selectedQuestionId;
      
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: filteredQuestions,
        },
        selectedQuestionId: newSelectedId,
        isDirty: true,
      };

    case FormActions.REORDER_QUESTIONS:
      if (!state.currentForm) return state;
      
      const { fromIndex, toIndex } = action.payload;
      const reorderedQuestions = [...state.currentForm.questions];
      const [movedQuestion] = reorderedQuestions.splice(fromIndex, 1);
      reorderedQuestions.splice(toIndex, 0, movedQuestion);
      
      const questionsWithUpdatedOrder = reorderedQuestions.map((question, index) => ({
        ...question,
        order: index + 1,
      }));
      
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: questionsWithUpdatedOrder,
        },
        isDirty: true,
      };

    case FormActions.UPDATE_FORM_META:
      if (!state.currentForm) return state;
      
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          ...action.payload,
        },
        isDirty: true,
      };

    case FormActions.RESET_FORM:
      return initialFormState;

    case FormActions.SET_DIRTY:
      return {
        ...state,
        isDirty: action.payload,
      };

    default:
      return state;
  }
}