"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Share2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useFormBuilder } from "@/contexts/FormBuilderContext";
import { toast } from "sonner";

export default function BuilderHeader() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId as string;
  const { state, saveForm } = useFormBuilder();

  const handleSave = async () => {
    console.log("Handle save called");
    try {
      await saveForm();
      console.log("Save completed");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/renderer/${formId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Form link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link to clipboard");
    }
  };

  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {state.form?.title || "Form Builder"}
          </h1>
          <p className="text-sm text-gray-500">
            {state.questions.length} question
            {state.questions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={state.isSaving}
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          {state.isSaving ? "Saving..." : "Save"}
        </Button>
        <Button 
          size="sm" 
          disabled={state.questions.length === 0}
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
