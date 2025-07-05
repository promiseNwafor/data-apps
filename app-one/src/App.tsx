import { Route, Routes } from 'react-router';
import PropertyEditor from './components/PropertyEditor';
import Canvas from './pages/Canvas';

function App() {
  const dummyProperties = [
    { key: 'color', value: 'blue' },
    { key: 'size', value: 100 },
    { key: 'label', value: 'Sample Design' },
    { key: 'opacity', value: 0.8 },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <Routes>
        <Route
          index
          path='/'
          element={
            <PropertyEditor
              initialProperties={dummyProperties}
              onChange={properties =>
                console.log('Properties changed:', properties)
              }
            />
          }
        />
        <Route path='/canvas' element={<Canvas />} />
      </Routes>
    </div>
  );
}

export default App;
