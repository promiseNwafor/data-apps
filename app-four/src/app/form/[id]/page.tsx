import { getForm } from '@/lib/actions/form-actions';
import { notFound } from 'next/navigation';
import FormRenderer from '@/components/form-renderer/FormRenderer';

interface FormPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormPage({ params }: FormPageProps) {
  const { id } = await params;
  const result = await getForm(id);

  if (!result.success || !result.form) {
    notFound();
  }

  const { form } = result;

  // Transform the form data to match our component interface
  const formData = {
    id: form.id,
    title: form.title,
    description: form.description || undefined,
    questions: (form.questions || []).map(q => ({
      id: q.id,
      type: q.type as 'text' | 'email' | 'phone',
      title: q.title,
      description: q.description || undefined,
      required: q.required,
    })),
  };

  return <FormRenderer form={formData} />;
}