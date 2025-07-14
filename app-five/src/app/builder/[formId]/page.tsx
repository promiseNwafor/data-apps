import { notFound } from 'next/navigation';
import { getFormData } from '@/actions/getFormData';
import FormBuilder from '@/components/builder/FormBuilder';

interface BuilderPageProps {
  params: {
    formId: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const form = await getFormData(params.formId);

  if (!form) {
    notFound();
  }

  return <FormBuilder initialForm={form} />;
}