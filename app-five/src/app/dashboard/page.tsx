import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FormsGrid from '@/components/dashboard/FormsGrid';

// Mock data for now - will be replaced with actual data fetching
const mockForms = [
  {
    id: '1',
    title: 'Customer Feedback Survey',
    createdAt: new Date('2024-01-15'),
    responseCount: 42
  },
  {
    id: '2',
    title: 'Employee Onboarding Form',
    createdAt: new Date('2024-01-10'),
    responseCount: 8
  },
  {
    id: '3',
    title: 'Product Registration',
    createdAt: new Date('2024-01-08'),
    responseCount: 156
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        <FormsGrid forms={mockForms} />
      </div>
    </div>
  );
}