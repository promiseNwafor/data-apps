'use server';

import { prisma } from '@/lib/prisma';
import { Form } from '@/types/form';

export async function saveForm(formData: Form) {
  try {
    // Update form metadata
    await prisma.form.update({
      where: { id: formData.id },
      data: {
        title: formData.title,
      }
    });

    // Delete existing questions and recreate them to handle order changes
    await prisma.question.deleteMany({
      where: { formId: formData.id }
    });

    // Create all questions with their current data
    if (formData.questions.length > 0) {
      // Use individual creates to handle JSON options field properly
      for (const question of formData.questions) {
        await prisma.question.create({
          data: {
            id: question.id,
            formId: question.formId,
            order: question.order,
            type: question.type,
            title: question.title,
            description: question.description || '',
            required: question.required,
            options: question.options ? question.options : undefined,
          }
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to save form:', error);
    return { success: false, error: 'Failed to save form' };
  }
}