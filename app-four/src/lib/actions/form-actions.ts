'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { QuestionInputType } from '@/lib/types';

export interface CreateFormData {
  title: string;
  description?: string;
  questions: {
    id: string;
    title: string;
    description?: string;
    type: QuestionInputType;
    required: boolean;
  }[];
}

export interface UpdateFormData extends CreateFormData {
  id: string;
}

export async function createForm(data: CreateFormData) {
  try {
    const form = await prisma.form.create({
      data: {
        title: data.title,
        description: data.description,
        questions: {
          create: data.questions.map((question, index) => ({
            id: question.id,
            title: question.title,
            description: question.description,
            type: question.type,
            required: question.required,
            order: index,
          })),
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    revalidatePath('/');
    return { success: true, form };
  } catch (error) {
    console.error('Failed to create form:', error);
    return { success: false, error: 'Failed to create form' };
  }
}

export async function updateForm(data: UpdateFormData) {
  try {
    // Delete existing questions and create new ones to handle reordering
    await prisma.question.deleteMany({
      where: { formId: data.id },
    });

    const form = await prisma.form.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        questions: {
          create: data.questions.map((question, index) => ({
            id: question.id,
            title: question.title,
            description: question.description,
            type: question.type,
            required: question.required,
            order: index,
          })),
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    revalidatePath('/');
    return { success: true, form };
  } catch (error) {
    console.error('Failed to update form:', error);
    return { success: false, error: 'Failed to update form' };
  }
}

export async function getForms() {
  try {
    const forms = await prisma.form.findMany({
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, forms };
  } catch (error) {
    console.error('Failed to fetch forms:', error);
    return { success: false, error: 'Failed to fetch forms' };
  }
}

export async function getForm(id: string) {
  try {
    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!form) {
      return { success: false, error: 'Form not found' };
    }

    return { success: true, form };
  } catch (error) {
    console.error('Failed to fetch form:', error);
    return { success: false, error: 'Failed to fetch form' };
  }
}

export async function deleteForm(id: string) {
  try {
    await prisma.form.delete({
      where: { id },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete form:', error);
    return { success: false, error: 'Failed to delete form' };
  }
}