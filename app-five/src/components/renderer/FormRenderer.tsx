'use client';

import { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rendererReducer, initialRendererState } from '@/reducers/rendererReducer';
import { RendererActions } from '@/types/renderer';
import { Form } from '@/types/form';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import ThankYouScreen from './ThankYouScreen';
import ProgressBar from './ProgressBar';

interface FormRendererProps {
  form: Form;
}

export default function FormRenderer({ form }: FormRendererProps) {
  const [state, dispatch] = useReducer(rendererReducer, initialRendererState);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !state.showWelcome && !state.isSubmitted) {
        e.preventDefault();
        if (state.currentQuestionIndex < form.questions.length - 1) {
          dispatch({ type: RendererActions.NEXT_QUESTION });
        } else {
          dispatch({ type: RendererActions.SET_SUBMITTING, payload: true });
          setTimeout(() => {
            dispatch({ type: RendererActions.SUBMIT_FORM });
          }, 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.showWelcome, state.isSubmitted, state.currentQuestionIndex, form.questions.length]);

  const handleStart = () => {
    dispatch({ type: RendererActions.START_FORM });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < form.questions.length - 1) {
      dispatch({ type: RendererActions.NEXT_QUESTION });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    dispatch({ type: RendererActions.PREVIOUS_QUESTION });
  };

  const handleUpdateResponse = (questionId: string, value: string | string[]) => {
    dispatch({
      type: RendererActions.UPDATE_RESPONSE,
      payload: { questionId, value }
    });
  };

  const handleSubmit = async () => {
    dispatch({ type: RendererActions.SET_SUBMITTING, payload: true });
    
    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    dispatch({ type: RendererActions.SUBMIT_FORM });
  };

  const currentQuestion = form.questions[state.currentQuestionIndex];
  const currentResponse = state.responses.find(r => r.questionId === currentQuestion?.id);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {!state.showWelcome && !state.isSubmitted && (
        <ProgressBar 
          current={state.currentQuestionIndex + 1} 
          total={form.questions.length} 
        />
      )}
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {state.showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <WelcomeScreen
                  form={form}
                  onStart={handleStart}
                />
              </motion.div>
            )}

            {!state.showWelcome && !state.isSubmitted && currentQuestion && (
              <motion.div
                key={`question-${state.currentQuestionIndex}`}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <QuestionScreen
                  question={currentQuestion}
                  questionNumber={state.currentQuestionIndex + 1}
                  totalQuestions={form.questions.length}
                  currentValue={currentResponse?.value}
                  onNext={handleNext}
                  onPrevious={state.currentQuestionIndex > 0 ? handlePrevious : undefined}
                  onUpdateResponse={handleUpdateResponse}
                  isSubmitting={state.isSubmitting}
                  isLastQuestion={state.currentQuestionIndex === form.questions.length - 1}
                />
              </motion.div>
            )}

            {state.isSubmitted && (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ThankYouScreen form={form} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}