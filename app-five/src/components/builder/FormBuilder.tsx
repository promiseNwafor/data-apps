'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from '@/contexts/FormContext';
import { FormActions } from '@/types/formActions';
import { Button } from '@/components/ui/button';
import { Save, Share2, Plus, Loader2 } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import QuestionList from './QuestionList';
import QuestionPreview from './QuestionPreview';
import QuestionEditor from './QuestionEditor';
import CreateFormModal from '@/components/shared/CreateFormModal';
import ShareModal from '@/components/shared/ShareModal';
import { saveForm } from '@/actions/saveForm';
import { toast } from 'sonner';
import { QuestionType } from '@/types/questionTypes';

interface SerializedForm {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Array<{
    id: string;
    formId: string;
    order: number;
    type: string;
    title: string;
    description: string | null;
    required: boolean;
    options?: string[];
    createdAt: string;
    updatedAt: string;
  }>;
}

interface FormBuilderProps {
  initialForm: SerializedForm;
}

export default function FormBuilder({ initialForm }: FormBuilderProps) {
  const { dispatch, currentForm, isDirty } = useForm();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Convert ISO strings back to Date objects and load form into context
    const formWithDates = {
      ...initialForm,
      createdAt: new Date(initialForm.createdAt),
      updatedAt: new Date(initialForm.updatedAt),
      questions: initialForm.questions.map((q) => ({
        ...q,
        type: q.type as QuestionType,
        description: q.description || undefined,
        createdAt: new Date(q.createdAt),
        updatedAt: new Date(q.updatedAt),
      })),
    };

    dispatch({ type: FormActions.SET_FORM, payload: formWithDates });
  }, [initialForm, dispatch]);

  const handleSave = () => {
    if (!currentForm || !isDirty) return;

    startTransition(async () => {
      const result = await saveForm(currentForm);
      if (result.success) {
        dispatch({ type: FormActions.SET_DIRTY, payload: false });
        console.log('Form saved successfully');
        toast.success('Form saved successfully');
      } else {
        console.error('Failed to save form:', result.error);
        toast.error('Failed to save form');
      }
    });
  };

  // Remove the handleShare function since we're using the modal directly

  if (!currentForm) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {currentForm.title}
            </h1>
            {isDirty && (
              <span className="text-sm text-orange-600 font-medium">
                Unsaved changes
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <CreateFormModal
              mode="add"
              trigger={
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={!isDirty || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
            <ShareModal
              formId={currentForm.id}
              formTitle={currentForm.title}
              trigger={
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Resizable three-panel layout */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Question List */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Questions</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <QuestionList />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center Panel - Preview */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
              <QuestionPreview />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Editor */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Question Editor</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <QuestionEditor />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
