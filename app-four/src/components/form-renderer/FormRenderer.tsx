'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/types';
import {
  getInitialState,
  calculateProgress,
  getTotalSteps,
  getCurrentStep,
  saveAnswer,
  getAnswerForQuestion,
  isLastQuestion,
  isOnWelcomeScreen,
  isOnQuestionScreen,
  isOnThankYouScreen,
  submitFormAnswers,
} from '@/lib/utils/form-renderer-utils';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import ThankYouScreen from './ThankYouScreen';
import ProgressBar from './ProgressBar';
import BackButton from './BackButton';

interface FormRendererProps {
  form: {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
  };
}

export default function FormRenderer({ form }: FormRendererProps) {
  const [state, setState] = useState(getInitialState());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    currentQuestionIndex,
    answers,
    currentAnswer,
    isAnimating,
    progress,
  } = state;

  const totalSteps = getTotalSteps(form.questions.length);
  const currentStep = getCurrentStep(currentQuestionIndex);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      progress: calculateProgress(currentStep, totalSteps),
    }));
  }, [currentStep, totalSteps]);

  const handleStart = () => {
    setState(prev => ({ ...prev, currentQuestionIndex: 0 }));
  };

  const handleNext = async () => {
    if (isAnimating) return;

    if (!isLastQuestion(currentQuestionIndex, form.questions.length)) {
      // Save current answer and move to next question
      const newAnswers = saveAnswer(
        answers,
        form.questions[currentQuestionIndex].id,
        currentAnswer
      );

      setState(prev => ({ ...prev, isAnimating: true }));

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          answers: newAnswers,
          currentAnswer: '',
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          isAnimating: false,
        }));
      }, 150);
    } else {
      // Last question - save and submit all answers
      const newAnswers = saveAnswer(
        answers,
        form.questions[currentQuestionIndex].id,
        currentAnswer
      );

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const result = await submitFormAnswers(form.id, newAnswers);

        if (result.success) {
          setState(prev => ({
            ...prev,
            answers: newAnswers,
            currentQuestionIndex: form.questions.length, // Thank you screen
          }));
        } else {
          setSubmitError(result.error || 'Failed to submit form');
        }
      } catch (error) {
        setSubmitError('Failed to submit form');
        console.error('Submit error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (isAnimating) return;

    if (currentQuestionIndex > -1) {
      setState(prev => ({ ...prev, isAnimating: true }));

      setTimeout(() => {
        setState(prev => {
          const newIndex = prev.currentQuestionIndex - 1;
          let newAnswer = '';

          // Restore previous answer if going back to a question
          if (newIndex >= 0) {
            const prevQuestion = form.questions[newIndex];
            newAnswer = getAnswerForQuestion(answers, prevQuestion.id);
          }

          return {
            ...prev,
            currentQuestionIndex: newIndex,
            currentAnswer: newAnswer,
            isAnimating: false,
          };
        });
      }, 150);
    }
  };

  const handleAnswerChange = (value: string) => {
    setState(prev => ({ ...prev, currentAnswer: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <ProgressBar progress={progress} />

      <BackButton onBack={handlePrevious} show={currentQuestionIndex > -1} />

      <AnimatePresence mode="wait">
        {isOnWelcomeScreen(currentQuestionIndex) && (
          <WelcomeScreen
            title={form.title}
            description={form.description}
            questionsCount={form.questions.length}
            onStart={handleStart}
          />
        )}

        {isOnQuestionScreen(currentQuestionIndex, form.questions.length) && (
          <QuestionScreen
            question={form.questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={form.questions.length}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onKeyPress={handleKeyPress}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {isOnThankYouScreen(currentQuestionIndex, form.questions.length) && (
          <ThankYouScreen answersCount={answers.length} />
        )}
      </AnimatePresence>
    </div>
  );
}
