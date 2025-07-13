'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { FormState, FormAction } from '@/lib/types';
import { formReducer, initialState } from '@/reducers/formReducer';

interface FormContextType {
  currentForm: FormState['currentForm'];
  selectedQuestionType: FormState['selectedQuestionType'];
  currentStep: FormState['currentStep'];
  isEditing: FormState['isEditing'];
  dispatch: React.Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider 
      value={{
        currentForm: state.currentForm,
        selectedQuestionType: state.selectedQuestionType,
        currentStep: state.currentStep,
        isEditing: state.isEditing,
        dispatch,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
