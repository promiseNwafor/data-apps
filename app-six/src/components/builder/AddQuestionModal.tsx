"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionType, FormBuilderActionType } from "@/types";
import { useFormBuilder } from "@/contexts/FormBuilderContext";
import { questionTypes } from "@/constants/questionTypes";

export default function AddQuestionModal() {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useFormBuilder();
  const params = useParams();
  const formId = params.formId as string;

  const handleAddQuestion = (questionType: QuestionType) => {
    const newQuestion = {
      id: uuidv4(),
      title: "Untitled Question",
      description: "",
      type: questionType,
      required: false,
      order: state.questions.length + 1,
      formId,
    };

    dispatch({
      type: FormBuilderActionType.ADD_QUESTION,
      payload: newQuestion,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            Choose a question type to add to your form.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {questionTypes.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.type}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left"
                onClick={() => handleAddQuestion(item.type)}
              >
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {item.description}
                </span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
