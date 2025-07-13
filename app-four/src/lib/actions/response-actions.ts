'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface SubmitResponseData {
  formId: string;
  answers: {
    questionId: string;
    value: string;
  }[];
}

export async function submitFormResponse(data: SubmitResponseData) {
  try {
    // Validate that the form exists
    const form = await prisma.form.findUnique({
      where: { id: data.formId },
      include: { questions: true },
    });

    if (!form) {
      return { success: false, error: 'Form not found' };
    }

    // Create the response with answers
    const response = await prisma.response.create({
      data: {
        formId: data.formId,
        answers: {
          create: data.answers.map(answer => ({
            questionId: answer.questionId,
            value: answer.value,
          })),
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    revalidatePath('/');
    return { success: true, response };
  } catch (error) {
    console.error('Failed to submit form response:', error);
    return { success: false, error: 'Failed to submit response' };
  }
}

export async function getFormResponses(formId: string) {
  try {
    const responses = await prisma.response.findMany({
      where: { formId },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    return { success: true, responses };
  } catch (error) {
    console.error('Failed to fetch form responses:', error);
    return { success: false, error: 'Failed to fetch responses' };
  }
}

export async function getResponseById(responseId: string) {
  try {
    const response = await prisma.response.findUnique({
      where: { id: responseId },
      include: {
        form: true,
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!response) {
      return { success: false, error: 'Response not found' };
    }

    return { success: true, response };
  } catch (error) {
    console.error('Failed to fetch response:', error);
    return { success: false, error: 'Failed to fetch response' };
  }
}

export async function getFormResponseCount(formId: string) {
  try {
    const count = await prisma.response.count({
      where: { formId },
    });

    return { success: true, count };
  } catch (error) {
    console.error('Failed to count responses:', error);
    return { success: false, error: 'Failed to count responses' };
  }
}