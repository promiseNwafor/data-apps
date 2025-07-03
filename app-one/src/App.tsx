

import PropertyEditor from './components/PropertyEditor';

function App() {
  const dummyProperties = [
    { key: 'color', value: 'blue' },
    { key: 'size', value: 100 },
    { key: 'label', value: 'Sample Design' },
    { key: 'opacity', value: 0.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PropertyEditor 
        initialProperties={dummyProperties}
        onChange={(properties) => console.log('Properties changed:', properties)}
      />
    </div>
  )
}

export default App
