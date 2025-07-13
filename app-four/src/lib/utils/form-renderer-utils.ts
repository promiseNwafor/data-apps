import { Question } from '@/lib/types';
import { submitFormResponse } from '@/lib/actions/response-actions';

export interface Answer {
  questionId: string;
  value: string;
}

export interface FormRendererState {
  currentQuestionIndex: number;
  answers: Answer[];
  currentAnswer: string;
  isAnimating: boolean;
  progress: number;
}

export const getInitialState = (): FormRendererState => ({
  currentQuestionIndex: -1, // Start with welcome screen
  answers: [],
  currentAnswer: '',
  isAnimating: false,
  progress: 0,
});

export const calculateProgress = (currentStep: number, totalSteps: number): number => {
  return (currentStep / totalSteps) * 100;
};

export const getTotalSteps = (questionsCount: number): number => {
  return questionsCount + 2; // +2 for welcome and thank you screens
};

export const getCurrentStep = (currentQuestionIndex: number): number => {
  return currentQuestionIndex + 2; // Adjust for welcome screen
};

export const saveAnswer = (
  answers: Answer[],
  questionId: string,
  value: string
): Answer[] => {
  if (!value.trim()) return answers;
  
  const newAnswer: Answer = { questionId, value: value.trim() };
  return [...answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer];
};

export const getAnswerForQuestion = (
  answers: Answer[],
  questionId: string
): string => {
  const answer = answers.find(a => a.questionId === questionId);
  return answer?.value || '';
};

export const getInputPlaceholder = (type: string): string => {
  switch (type) {
    case 'email':
      return 'your@email.com';
    case 'phone':
      return '+1 (555) 123-4567';
    default:
      return 'Type your answer here...';
  }
};

export const getInputType = (questionType: string): string => {
  switch (questionType) {
    case 'email':
      return 'email';
    case 'phone':
      return 'tel';
    default:
      return 'text';
  }
};

export const getEstimatedTime = (questionsCount: number): number => {
  return Math.ceil(questionsCount * 0.5);
};

export const isLastQuestion = (
  currentQuestionIndex: number,
  questionsCount: number
): boolean => {
  return currentQuestionIndex === questionsCount - 1;
};

export const canProceed = (question: Question, answer: string): boolean => {
  return !question.required || answer.trim().length > 0;
};

export const isOnWelcomeScreen = (currentQuestionIndex: number): boolean => {
  return currentQuestionIndex === -1;
};

export const isOnThankYouScreen = (
  currentQuestionIndex: number,
  questionsCount: number
): boolean => {
  return currentQuestionIndex === questionsCount;
};

export const isOnQuestionScreen = (
  currentQuestionIndex: number,
  questionsCount: number
): boolean => {
  return currentQuestionIndex >= 0 && currentQuestionIndex < questionsCount;
};

export const prepareResponseData = (formId: string, answers: Answer[]) => {
  return {
    formId,
    answers: answers.filter(answer => answer.value.trim().length > 0),
  };
};

export const submitFormAnswers = async (formId: string, answers: Answer[]) => {
  try {
    const responseData = prepareResponseData(formId, answers);
    const result = await submitFormResponse(responseData);
    return result;
  } catch (error) {
    console.error('Failed to submit form answers:', error);
    return { success: false, error: 'Failed to submit answers' };
  }
};