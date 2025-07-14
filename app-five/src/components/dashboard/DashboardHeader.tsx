'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateFormModal from '@/components/shared/CreateFormModal';

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Manage your forms and view responses
        </p>
      </div>
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
