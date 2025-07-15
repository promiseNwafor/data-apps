"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  FormBuilderState,
  FormBuilderAction,
  FormBuilderActionType,
} from "@/types";
import {
  formBuilderReducer,
  initialFormBuilderState,
} from "@/reducers/formBuilderReducer";
import { saveQuestions } from "@/actions/questions";
import { loadFormData } from "@/lib/formService";
import { toast } from "sonner";

interface FormBuilderContextType {
  state: FormBuilderState;
  dispatch: React.Dispatch<FormBuilderAction>;
  saveForm: () => Promise<void>;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(
  undefined
);

interface FormBuilderProviderProps {
  children: ReactNode;
  formId: string;
}

export function FormBuilderProvider({
  children,
  formId,
}: FormBuilderProviderProps) {
  const [state, dispatch] = useReducer(
    formBuilderReducer,
    initialFormBuilderState
  );

  // Load form data on mount
  useEffect(() => {
    loadFormData(formId, dispatch);
  }, [formId]);

  const saveForm = async () => {
    console.log("saveForm called with questions:", state.questions);
    dispatch({ type: FormBuilderActionType.SET_SAVING, payload: true });

    try {
      const result = await saveQuestions(formId, state.questions);
      console.log("Save result:", result);
      if (!result.success) {
        console.error("Failed to save:", result.error);
        toast.error("Failed to save form");
      } else {
        toast.success("Form saved successfully");
      }
    } catch (error) {
      console.error("Failed to save form:", error);
      toast.error("Failed to save form");
    } finally {
      dispatch({ type: FormBuilderActionType.SET_SAVING, payload: false });
    }
  };

  return (
    <FormBuilderContext.Provider value={{ state, dispatch, saveForm }}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
}
