"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getFormWithQuestions } from "@/actions/questions";
import { Question, Form } from "@/types";
import QuestionScreen from "./QuestionScreen";
import WelcomeScreen from "./WelcomeScreen";
import ThankYouScreen from "./ThankYouScreen";

interface FormRendererProps {
  formId: string;
}

export default function FormRenderer({ formId }: FormRendererProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(-1); // -1 = welcome, 0+ = questions, questions.length = thank you
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const loadForm = async () => {
      setIsLoading(true);
      try {
        const result = await getFormWithQuestions(formId);
        if (result.success && result.form) {
          setForm(result.form);
          setQuestions(result.form.questions);
        }
      } catch (error) {
        console.error("Failed to load form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadForm();
  }, [formId]);

  const totalSteps = questions.length + 2; // welcome + questions + thank you
  const currentProgress = ((currentStep + 2) / totalSteps) * 100;

  const goToNext = () => {
    if (currentStep < questions.length) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > -1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submitForm = async () => {
    // TODO: Implement form submission
    console.log("Submitting form:", { formId, answers });
    goToNext(); // Go to thank you screen
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading form...</div>
      </div>
    );
  }

  if (!form || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Form not found or has no questions</div>
      </div>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <Progress value={currentProgress} className="w-full h-2 bg-white/20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentStep === -1 && (
              <motion.div
                key="welcome"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <WelcomeScreen form={form} onStart={goToNext} />
              </motion.div>
            )}

            {currentStep >= 0 && currentStep < questions.length && (
              <motion.div
                key={`question-${currentStep}`}
                custom={direction}
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
                  question={questions[currentStep]}
                  answer={answers[questions[currentStep].id] || ""}
                  onAnswer={updateAnswer}
                  onNext={currentStep === questions.length - 1 ? submitForm : goToNext}
                  onPrevious={goToPrevious}
                  canGoBack={currentStep > 0}
                  isLast={currentStep === questions.length - 1}
                  questionNumber={currentStep + 1}
                  totalQuestions={questions.length}
                />
              </motion.div>
            )}

            {currentStep === questions.length && (
              <motion.div
                key="thank-you"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
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