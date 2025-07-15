"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Question, QuestionType } from "@/types";

interface QuestionInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export default function QuestionInput({ question, value, onChange, onKeyPress }: QuestionInputProps) {
  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your answer..."
          className="w-full h-12 text-lg"
          autoFocus
        />
      );

    case QuestionType.EMAIL:
      return (
        <Input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter your email address..."
          className="w-full h-12 text-lg"
          autoFocus
        />
      );

    case QuestionType.NUMBER:
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter a number..."
          className="w-full h-12 text-lg"
          autoFocus
        />
      );

    case QuestionType.PHONE:
      return (
        <Input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter your phone number..."
          className="w-full h-12 text-lg"
          autoFocus
        />
      );

    case QuestionType.YESNO:
      return (
        <div className="space-y-3">
          <Button
            variant={value === "Yes" ? "default" : "outline"}
            size="lg"
            className="w-full h-12 text-lg"
            onClick={() => onChange("Yes")}
            onKeyPress={(e) => e.key === "y" && onChange("Yes")}
          >
            Yes
          </Button>
          <Button
            variant={value === "No" ? "default" : "outline"}
            size="lg"
            className="w-full h-12 text-lg"
            onClick={() => onChange("No")}
            onKeyPress={(e) => e.key === "n" && onChange("No")}
          >
            No
          </Button>
        </div>
      );

    default:
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer..."
          className="w-full min-h-[100px] text-lg resize-none"
          autoFocus
        />
      );
  }
}