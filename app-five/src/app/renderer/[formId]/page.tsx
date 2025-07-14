import { notFound } from 'next/navigation';
import { getFormData } from '@/actions/getFormData';
import FormRenderer from '@/components/renderer/FormRenderer';
import { QuestionType } from '@/types/questionTypes';

interface RendererPageProps {
  params: {
    formId: string;
  };
}

export default async function RendererPage({ params }: RendererPageProps) {
  const form = await getFormData(params.formId);

  if (!form) {
    notFound();
  }

  // Convert ISO strings back to Date objects
  const formWithDates = {
    ...form,
    createdAt: new Date(form.createdAt),
    updatedAt: new Date(form.updatedAt),
    questions: form.questions.map((q) => ({
      ...q,
      type: q.type as QuestionType,
      description: q.description || undefined,
      createdAt: new Date(q.createdAt),
      updatedAt: new Date(q.updatedAt),
    }))
  };

  return <FormRenderer form={formWithDates} />;
}