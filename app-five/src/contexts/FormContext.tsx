'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { FormState, FormAction } from '@/types/form';
import { formReducer, initialFormState } from '@/reducers/formReducer';

interface FormContextType extends FormState {
  dispatch: React.Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  console.log('Form state:', state);

  return (
    <FormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}
