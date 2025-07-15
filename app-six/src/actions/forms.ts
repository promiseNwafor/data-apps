"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export async function createForm(formData: FormData) {
  try {
    const validatedFields = createFormSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.format(),
      };
    }

    const { title, description } = validatedFields.data;

    const newForm = await prisma.form.create({
      data: {
        title,
        description: description || undefined,
      },
    });

    revalidatePath("/");
    return { success: true, formId: newForm.id };
  } catch (error) {
    console.error("Failed to create form:", error);
    return {
      errors: {
        _form: ["Failed to create form. Please try again."],
      },
    };
  }
}

export async function getForms() {
  try {
    const forms = await prisma.form.findMany({
      include: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return forms.map(form => ({
      ...form,
      responseCount: form._count.responses,
    }));
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return [];
  }
}