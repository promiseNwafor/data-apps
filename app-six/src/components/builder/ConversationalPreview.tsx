"use client";

import { useFormBuilder } from "@/contexts/FormBuilderContext";
import { QuestionType } from "@/types";

export default function ConversationalPreview() {
  const { state } = useFormBuilder();
  const selectedQuestion = state.questions.find(q => q.id === state.selectedQuestionId);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      {selectedQuestion ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {selectedQuestion.title}
          </h2>
          {selectedQuestion.description && (
            <p className="text-gray-600 mb-4">{selectedQuestion.description}</p>
          )}
          <div className="space-y-3">
            {/* Basic preview based on question type */}
            {selectedQuestion.type === QuestionType.TEXT && (
              <input 
                type="text" 
                placeholder="Type your answer here..." 
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
            )}
            {selectedQuestion.type === QuestionType.EMAIL && (
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
            )}
            {selectedQuestion.type === QuestionType.YESNO && (
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled>
                  Yes
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md" disabled>
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Select a question to preview</p>
        </div>
      )}
    </div>
  );
}