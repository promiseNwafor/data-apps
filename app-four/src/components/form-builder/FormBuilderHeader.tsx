'use client';

import { useState } from 'react';
import { ArrowLeft, Share, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@/contexts/FormContext';
import { QUESTION_TYPES } from '@/lib/constants';
import { FormActionType, FormStep } from '@/lib/types';
import { saveFormData } from '@/lib/utils/form-utils';

interface FormBuilderHeaderProps {
  formTitle: string;
  setFormTitle: (title: string) => void;
  onSaveMetadata: () => void;
}

export default function FormBuilderHeader({
  formTitle,
  setFormTitle,
  onSaveMetadata,
}: FormBuilderHeaderProps) {
  const { selectedQuestionType, dispatch, currentForm } = useForm();
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedQuestionTypeInfo = QUESTION_TYPES.find(
    type => type.id === selectedQuestionType
  );

  const handleBackToDashboard = () => {
    dispatch({
      type: FormActionType.SET_CURRENT_STEP,
      payload: FormStep.DASHBOARD,
    });
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      
      // Save metadata first
      onSaveMetadata();
      
      // Save form to database
      const result = await saveFormData({ 
        currentForm, 
        selectedQuestionType, 
        currentStep: FormStep.BUILDER, 
        isEditing: false 
      });
      
      if (result.success && result.form) {
        const link = `${window.location.origin}/form/${result.form.id}`;
        setShareLink(link);
        
        // Update form context with the saved form ID
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
      } else {
        alert('Failed to save form: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sharing form:', error);
      alert('Failed to share form');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={handleBackToDashboard}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <Input
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              onBlur={onSaveMetadata}
              placeholder="Form title..."
              className="text-lg font-semibold border-none shadow-none p-0 h-auto"
            />
            {selectedQuestionTypeInfo && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {selectedQuestionTypeInfo.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {shareLink && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Share link:</span>
              <Input
                value={shareLink}
                readOnly
                className="w-64 text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          )}
          <Button
            onClick={handleShare}
            disabled={isSharing || !formTitle || !currentForm.questions?.length}
            className="flex items-center gap-2"
          >
            <Share className="w-4 h-4" />
            {isSharing ? 'Sharing...' : 'Share Form'}
          </Button>
        </div>
      </div>
    </div>
  );
}
