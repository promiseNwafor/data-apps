"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { QuestionType } from "@/types";

const questionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.nativeEnum(QuestionType),
  required: z.boolean(),
  order: z.number().int().positive(),
  formId: z.string().min(1, "Form ID is required"),
});

export async function saveQuestions(formId: string, questions: any[]) {
  try {
    // Validate all questions
    const validatedQuestions = questions.map(q => {
      const result = questionSchema.safeParse(q);
      if (!result.success) {
        throw new Error(`Invalid question data: ${result.error.message}`);
      }
      return result.data;
    });

    // Delete existing questions for this form
    await prisma.question.deleteMany({
      where: { formId }
    });

    // Create new questions
    if (validatedQuestions.length > 0) {
      await prisma.question.createMany({
        data: validatedQuestions
      });
    }

    revalidatePath(`/builder/${formId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to save questions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save questions"
    };
  }
}

export async function getFormWithQuestions(formId: string) {
  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        questions: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    return { success: true, form };
  } catch (error) {
    console.error("Failed to fetch form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch form"
    };
  }
}