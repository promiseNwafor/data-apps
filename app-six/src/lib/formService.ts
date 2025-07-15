import { FormBuilderActionType } from "@/types";
import { getFormWithQuestions } from "@/actions/questions";

export async function loadFormData(
  formId: string, 
  dispatch: React.Dispatch<any>
) {
  dispatch({ type: FormBuilderActionType.SET_LOADING, payload: true });
  
  try {
    const result = await getFormWithQuestions(formId);
    if (result.success && result.form) {
      dispatch({ type: FormBuilderActionType.SET_FORM, payload: result.form });
      dispatch({ type: FormBuilderActionType.SET_QUESTIONS, payload: result.form.questions });
      
      if (result.form.questions.length > 0) {
        dispatch({ 
          type: FormBuilderActionType.SELECT_QUESTION, 
          payload: result.form.questions[0].id 
        });
      }
    }
  } catch (error) {
    console.error("Failed to load form data:", error);
  } finally {
    dispatch({ type: FormBuilderActionType.SET_LOADING, payload: false });
  }
}