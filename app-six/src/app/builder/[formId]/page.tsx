"use client";

import { useParams } from "next/navigation";
import { FormBuilderProvider } from "@/contexts/FormBuilderContext";
import QuestionList from "@/components/builder/QuestionList";
import ConversationalPreview from "@/components/builder/ConversationalPreview";
import QuestionEditor from "@/components/builder/QuestionEditor";
import BuilderHeader from "@/components/builder/BuilderHeader";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function BuilderPage() {
  const params = useParams();
  const formId = params.formId as string;

  return (
    <FormBuilderProvider formId={formId}>
      <div className="min-h-screen bg-gray-50">
        <BuilderHeader />
        
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-80px)]">
          {/* Left Panel - Question List */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full bg-white border-r border-gray-200">
              <QuestionList />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center Panel - Conversational Preview */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
              <ConversationalPreview />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Question Editor */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full bg-white border-l border-gray-200">
              <QuestionEditor />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FormBuilderProvider>
  );
}