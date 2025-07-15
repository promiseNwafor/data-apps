import { FileText } from "lucide-react";
import CreateFormModal from "./CreateFormModal";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-6">
        <FileText className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Create your first conversational form to start collecting responses from your audience.
      </p>
      <CreateFormModal />
    </div>
  );
}