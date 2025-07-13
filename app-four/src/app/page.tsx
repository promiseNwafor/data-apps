'use client';

import Dashboard from '@/components/dashboard/Dashboard';
import FormBuilder from '@/components/form-builder/FormBuilder';
import { useForm } from '@/contexts/FormContext';
import { FormStep } from '@/lib/types';

export default function Home() {
  const { currentStep } = useForm();

  switch (currentStep) {
    case FormStep.DASHBOARD:
      return <Dashboard />;
    case FormStep.BUILDER:
      return <FormBuilder />;
    case FormStep.RENDERER:
      // TODO: Implement FormRenderer
      return <div>Form Renderer (Coming Soon)</div>;
    default:
      return <Dashboard />;
  }
}
