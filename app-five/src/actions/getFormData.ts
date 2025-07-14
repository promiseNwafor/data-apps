'use server';

import { prisma } from '@/lib/prisma';

export async function getFormData(formId: string) {
  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!form) {
    return null;
  }

  return {
    ...form,
    createdAt: form.createdAt.toISOString(),
    updatedAt: form.updatedAt.toISOString(),
    questions: form.questions.map(question => ({
      ...question,
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
      options: question.options ? (question.options as string[]) : undefined,
    }))
  };
}