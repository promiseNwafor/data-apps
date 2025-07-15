"use client";

import { useFormBuilder } from "@/contexts/FormBuilderContext";
import { FormBuilderActionType } from "@/types";
import AddQuestionModal from "./AddQuestionModal";

export default function QuestionList() {
  const { state, dispatch } = useFormBuilder();

  const handleSelectQuestion = (questionId: string) => {
    dispatch({ type: FormBuilderActionType.SELECT_QUESTION, payload: questionId });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Questions</h3>
      </div>
      
      <div className="flex-1 p-4">
        {state.questions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="mb-4">No questions yet</p>
            <AddQuestionModal />
          </div>
        ) : (
          <div className="space-y-2">
            {state.questions.map((question, index) => (
              <div
                key={question.id}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  state.selectedQuestionId === question.id
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => handleSelectQuestion(question.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {index + 1}. {question.title}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {question.type}
                </div>
              </div>
            ))}
            
            <div className="pt-2">
              <AddQuestionModal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}