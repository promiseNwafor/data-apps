import { Sun } from 'lucide-react';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Sun data-testid="lucide-icon" className="w-16 h-16 text-yellow-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Hello World</h1>
    </div>
  );
};

export default App;
