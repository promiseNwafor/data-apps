"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Form } from "@/types";

interface WelcomeScreenProps {
  form: Form;
  onStart: () => void;
}

export default function WelcomeScreen({ form, onStart }: WelcomeScreenProps) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {form.title}
        </h1>
        {form.description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {form.description}
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-gray-500">
          This form will take just a few minutes to complete
        </p>
      </div>

      <Button 
        size="lg" 
        onClick={onStart}
        className="w-full h-12 text-lg"
      >
        Start Form
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}