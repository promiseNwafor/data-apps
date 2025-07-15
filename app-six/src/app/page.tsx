"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/components/dashboard/FormCard";
import CreateFormModal from "@/components/dashboard/CreateFormModal";
import EmptyState from "@/components/dashboard/EmptyState";

// Mock data for now - will be replaced with actual data fetching
const mockForms = [
  {
    id: "1",
    title: "Customer Feedback Survey",
    description: "Collect feedback from our customers about their experience",
    createdAt: new Date("2024-01-15"),
    responseCount: 42
  },
  {
    id: "2", 
    title: "Event Registration",
    description: "Registration form for our upcoming conference",
    createdAt: new Date("2024-01-10"),
    responseCount: 15
  },
  {
    id: "3",
    title: "Contact Form",
    createdAt: new Date("2024-01-05"),
    responseCount: 8
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [forms, setForms] = useState(mockForms);

  const handleEditForm = (formId: string) => {
    router.push(`/builder/${formId}`);
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
  };

  const handleViewResponses = (formId: string) => {
    router.push(`/responses/${formId}`);
  };

  const handleShareForm = (formId: string) => {
    const shareUrl = `${window.location.origin}/renderer/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    // Add toast notification here later
    console.log("Share URL copied:", shareUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
              <p className="mt-2 text-gray-600">
                Create and manage your conversational forms
              </p>
            </div>
            {forms.length > 0 && (
              <CreateFormModal />
            )}
          </div>
        </div>

        {forms.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                onEdit={handleEditForm}
                onDelete={handleDeleteForm}
                onViewResponses={handleViewResponses}
                onShare={handleShareForm}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
