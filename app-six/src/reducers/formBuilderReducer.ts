import { FormBuilderState, FormBuilderAction, FormBuilderActionType } from "@/types";

export const initialFormBuilderState: FormBuilderState = {
  form: null,
  questions: [],
  selectedQuestionId: null,
  isLoading: false,
  isSaving: false,
};

export function formBuilderReducer(
  state: FormBuilderState,
  action: FormBuilderAction
): FormBuilderState {
  switch (action.type) {
    case FormBuilderActionType.SET_FORM:
      return {
        ...state,
        form: action.payload,
      };

    case FormBuilderActionType.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case FormBuilderActionType.ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        selectedQuestionId: action.payload.id,
      };

    case FormBuilderActionType.UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };

    case FormBuilderActionType.DELETE_QUESTION:
      const filteredQuestions = state.questions.filter(
        (q) => q.id !== action.payload
      );
      return {
        ...state,
        questions: filteredQuestions,
        selectedQuestionId:
          state.selectedQuestionId === action.payload
            ? filteredQuestions[0]?.id || null
            : state.selectedQuestionId,
      };

    case FormBuilderActionType.SELECT_QUESTION:
      return {
        ...state,
        selectedQuestionId: action.payload,
      };

    case FormBuilderActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case FormBuilderActionType.SET_SAVING:
      return {
        ...state,
        isSaving: action.payload,
      };

    case FormBuilderActionType.REORDER_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
}