import { FormState } from '@/lib/types';
import { createForm, updateForm, CreateFormData, UpdateFormData } from '@/lib/actions/form-actions';

export async function saveFormData(formState: FormState) {
  try {
    const { currentForm } = formState;
    
    if (!currentForm.title || !currentForm.questions?.length) {
      throw new Error('Form title and at least one question are required');
    }

    const formData: CreateFormData = {
      title: currentForm.title,
      description: currentForm.description || '',
      questions: currentForm.questions.map(question => ({
        id: question.id,
        title: question.title,
        description: question.description,
        type: question.type,
        required: question.required,
      })),
    };

    if (currentForm.id) {
      // Update existing form
      const updateData: UpdateFormData = {
        id: currentForm.id,
        ...formData,
      };
      return await updateForm(updateData);
    } else {
      // Create new form
      return await createForm(formData);
    }
  } catch (error) {
    console.error('Failed to save form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save form' 
    };
  }
}

export function formatFormForDisplay(form: any) {
  try {
    return {
      ...form,
      createdAt: typeof form.createdAt === 'string' ? form.createdAt : form.createdAt.toISOString(),
      updatedAt: form.updatedAt ? (typeof form.updatedAt === 'string' ? form.updatedAt : form.updatedAt.toISOString()) : undefined,
      responses: 0, // Mock data for now
    };
  } catch (error) {
    console.error('Failed to format form:', error);
    return form;
  }
}