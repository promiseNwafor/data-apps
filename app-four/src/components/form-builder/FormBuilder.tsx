'use client';

import { useState, useEffect } from 'react';
import { useForm } from '@/contexts/FormContext';
import { FormActionType, Question } from '@/lib/types';
import FormBuilderHeader from './FormBuilderHeader';
import QuestionListPanel from './QuestionListPanel';
import QuestionPreviewPanel from './QuestionPreviewPanel';
import QuestionEditorPanel from './QuestionEditorPanel';

export default function FormBuilder() {
  const { currentForm, dispatch } = useForm();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState(currentForm.title || '');
  const [formDescription, setFormDescription] = useState(currentForm.description || '');

  const questions = currentForm.questions || [];
  const currentQuestion = currentQuestionIndex !== null ? questions[currentQuestionIndex] : null;

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === null) {
      setCurrentQuestionIndex(0);
    }
  }, [questions.length, currentQuestionIndex]);

  const handleSaveMetadata = () => {
    dispatch({
      type: FormActionType.SET_FORM_METADATA,
      payload: { title: formTitle, description: formDescription },
    });
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleUpdateCurrentQuestion = (updates: Partial<Question>) => {
    if (currentQuestion) {
      dispatch({
        type: FormActionType.UPDATE_QUESTION,
        payload: { id: currentQuestion.id, question: updates },
      });
    }
  };

  const handleDeleteQuestion = () => {
    if (currentQuestion) {
      dispatch({ type: FormActionType.DELETE_QUESTION, payload: currentQuestion.id });
      if (currentQuestionIndex !== null && currentQuestionIndex >= questions.length - 1) {
        setCurrentQuestionIndex(questions.length > 1 ? questions.length - 2 : null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormBuilderHeader
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        onSaveMetadata={handleSaveMetadata}
      />

      <div className="flex h-[calc(100vh-80px)]">
        <QuestionListPanel
          currentQuestionIndex={currentQuestionIndex}
          onSelectQuestion={handleSelectQuestion}
          formDescription={formDescription}
          setFormDescription={setFormDescription}
          onSaveMetadata={handleSaveMetadata}
        />

        <QuestionPreviewPanel currentQuestion={currentQuestion} />

        <QuestionEditorPanel
          currentQuestion={currentQuestion}
          onUpdate={handleUpdateCurrentQuestion}
          onDelete={handleDeleteQuestion}
        />
      </div>
    </div>
  );
}