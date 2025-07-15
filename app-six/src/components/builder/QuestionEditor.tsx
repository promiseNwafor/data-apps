"use client";

import { useFormBuilder } from "@/contexts/FormBuilderContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormBuilderActionType } from "@/types";
import { questionTypes } from "@/constants/questionTypes";

export default function QuestionEditor() {
  const { state, dispatch } = useFormBuilder();
  const selectedQuestion = state.questions.find(q => q.id === state.selectedQuestionId);

  if (!selectedQuestion) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a question to edit</p>
      </div>
    );
  }

  const updateQuestion = (updates: Partial<typeof selectedQuestion>) => {
    dispatch({
      type: FormBuilderActionType.UPDATE_QUESTION,
      payload: { ...selectedQuestion, ...updates }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Question Settings</h3>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="question-title">Question Title</Label>
          <Input
            id="question-title"
            value={selectedQuestion.title}
            onChange={(e) => updateQuestion({ title: e.target.value })}
            placeholder="Enter question title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question-description">Description (Optional)</Label>
          <Textarea
            id="question-description"
            value={selectedQuestion.description || ""}
            onChange={(e) => updateQuestion({ description: e.target.value })}
            placeholder="Add a description to help users understand the question"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question-type">Question Type</Label>
          <Select
            value={selectedQuestion.type}
            onValueChange={(value) => updateQuestion({ type: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {questionTypes.map((type) => (
                <SelectItem key={type.type} value={type.type}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="required-toggle">Required</Label>
          <Switch
            id="required-toggle"
            checked={selectedQuestion.required}
            onCheckedChange={(checked) => updateQuestion({ required: checked })}
          />
        </div>
      </div>
    </div>
  );
}