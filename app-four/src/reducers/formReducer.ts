import { FormState, FormAction, FormStep, FormActionType } from '@/lib/types';

export const initialState: FormState = {
  currentForm: {
    id: '',
    title: '',
    description: '',
    questions: [],
  },
  selectedQuestionType: null,
  currentStep: FormStep.DASHBOARD,
  isEditing: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case FormActionType.SET_QUESTION_TYPE:
      return {
        ...state,
        selectedQuestionType: action.payload,
      };

    case FormActionType.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    case FormActionType.SET_FORM_METADATA:
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          title: action.payload.title,
          description: action.payload.description,
        },
      };

    case FormActionType.ADD_QUESTION:
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: [...(state.currentForm.questions || []), action.payload],
        },
      };

    case FormActionType.UPDATE_QUESTION:
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: (state.currentForm.questions || []).map(q =>
            q.id === action.payload.id
              ? { ...q, ...action.payload.question }
              : q
          ),
        },
      };

    case FormActionType.DELETE_QUESTION:
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          questions: (state.currentForm.questions || []).filter(
            q => q.id !== action.payload
          ),
        },
      };

    case FormActionType.RESET_FORM:
      return {
        ...state,
        currentForm: {
          id: '',
          title: '',
          description: '',
          questions: [],
        },
        selectedQuestionType: null,
        isEditing: false,
      };

    case FormActionType.LOAD_FORM:
      return {
        ...state,
        currentForm: action.payload,
        isEditing: true,
      };

    default:
      return state;
  }
}
