"use client";

import { useParams } from "next/navigation";
import FormRenderer from "@/components/renderer/FormRenderer";

export default function RendererPage() {
  const params = useParams();
  const formId = params.formId as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <FormRenderer formId={formId} />
    </div>
  );
}