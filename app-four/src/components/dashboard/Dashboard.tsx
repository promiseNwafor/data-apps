'use client';

import { useState, useEffect } from 'react';
import { Plus, FileText, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateFormModal from './CreateFormModal';
import { getForms, getForm } from '@/lib/actions/form-actions';
import { getFormResponseCount } from '@/lib/actions/response-actions';
import { Form, FormActionType, FormStep } from '@/lib/types';
import { useForm } from '@/contexts/FormContext';

interface FormWithStats extends Form {
  responseCount: number;
}

export default function Dashboard() {
  const { dispatch } = useForm();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [forms, setForms] = useState<FormWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingFormId, setLoadingFormId] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getForms();

      if (result.success && result.forms) {
        // Get response counts for each form
        const formsWithStats = await Promise.all(
          result.forms.map(async form => {
            const countResult = await getFormResponseCount(form.id);
            return {
              ...form,
              responseCount: countResult.success ? countResult.count : 0,
              createdAt:
                typeof form.createdAt === 'string'
                  ? form.createdAt
                  : form.createdAt.toISOString(),
            };
          })
        );

        setForms(formsWithStats as FormWithStats[]);
      } else {
        setError(result.error || 'Failed to load forms');
      }
    } catch (err) {
      setError('Failed to load forms');
      console.error('Error loading forms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = () => {
    setShowCreateModal(true);
  };

  const handleEditForm = async (formId: string) => {
    try {
      setLoadingFormId(formId);
      
      // Fetch the full form data
      const result = await getForm(formId);
      
      if (result.success && result.form) {
        // Load form into context
        dispatch({
          type: FormActionType.LOAD_FORM,
          payload: {
            ...result.form,
            description: result.form.description || undefined,
            questions: (result.form.questions || []).map(q => ({
              ...q,
              description: q.description || undefined,
            })),
          },
        });

        // Set the first question type as selected if questions exist
        if (result.form.questions && result.form.questions.length > 0) {
          dispatch({
            type: FormActionType.SET_QUESTION_TYPE,
            payload: result.form.questions[0].type,
          });
        }

        // Navigate to form builder
        dispatch({
          type: FormActionType.SET_CURRENT_STEP,
          payload: FormStep.BUILDER,
        });
      } else {
        setError(result.error || 'Failed to load form');
      }
    } catch (err) {
      setError('Failed to load form');
      console.error('Error loading form:', err);
    } finally {
      setLoadingFormId(null);
    }
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    // Reload forms when modal closes (in case a new form was created)
    loadForms();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
            <p className="text-gray-600 mt-1">Create and manage your forms</p>
          </div>
          <Button
            onClick={handleCreateForm}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Form
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading forms...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error loading forms
            </h3>
            <p className="text-red-500 mb-6">{error}</p>
            <Button onClick={loadForms} variant="outline">
              Try Again
            </Button>
          </div>
        ) : forms.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No forms yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first form
            </p>
            <Button onClick={handleCreateForm}>Create your first form</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forms.map(form => (
              <div
                key={form.id}
                className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
                  loadingFormId === form.id ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => handleEditForm(form.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {form.title}
                    </h3>
                    {loadingFormId === form.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    ) : (
                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {form.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {form.responseCount} responses
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(form.createdAt).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateFormModal open={showCreateModal} onClose={handleModalClose} />
    </div>
  );
}
