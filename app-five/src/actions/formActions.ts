'use server';

import { prisma } from '@/lib/prisma';
import { QuestionType } from '@/types/questionTypes';

export async function createFormWithFirstQuestion(questionType: QuestionType) {
  try {
    const form = await prisma.form.create({
      data: {
        title: 'Untitled Form',
        questions: {
          create: {
            order: 1,
            type: questionType,
            title: `Untitled ${questionType.toLowerCase()} question`,
            description: '',
            required: false,
          }
        }
      },
      include: {
        questions: true
      }
    });

    return { success: true, formId: form.id };
  } catch (error) {
    console.error('Failed to create form:', error);
    return { success: false, error: 'Failed to create form' };
  }
}