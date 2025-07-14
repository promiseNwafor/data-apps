import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FormCard from './FormCard';
import CreateFormModal from '@/components/shared/CreateFormModal';

interface Form {
  id: string;
  title: string;
  createdAt: Date;
  responseCount: number;
}

interface FormsGridProps {
  forms: Form[];
}

export default function FormsGrid({ forms }: FormsGridProps) {
  if (forms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms yet</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first form</p>
        <CreateFormModal 
          mode="create" 
          trigger={
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Form
            </Button>
          }
        />
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}