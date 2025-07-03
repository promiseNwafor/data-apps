import DynamicDataTable from './components/DynamicDataTable';
import type { Item } from './types';

const mockData: Item[] = [
  { id: '1', name: 'Widget A', category: 'Electronics', value: 299.99, status: 'Active' },
  { id: '2', name: 'Gadget B', category: 'Home', value: 149.50, status: 'Inactive' },
  { id: '3', name: 'Tool C', category: 'Electronics', value: 79.99, status: 'Pending' },
  { id: '4', name: 'Device D', category: 'Sports', value: 199.00, status: 'Active' },
  { id: '5', name: 'Item E', category: 'Home', value: 89.99, status: 'Active' },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dynamic Data Table</h1>
        <DynamicDataTable data={mockData} />
      </div>
    </div>
  );
};

export default App;
