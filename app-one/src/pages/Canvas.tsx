import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CanvasGrid from '@/components/canvas/CanvasGrid';
import DynamicElementInspector from '../components/canvas/DynamicElementInspector';
import type { ElementProperties } from '@/types';

const formSchema = z.object({
  x: z.number().min(0, "X must be non-negative").max(5000, "X cannot exceed 5000px"),
  y: z.number().min(0, "Y must be non-negative").max(5000, "Y cannot exceed 5000px"),
  width: z.number().min(1, "Width must be at least 1px").max(2000, "Width cannot exceed 2000px"),
  height: z.number().min(1, "Height must be at least 1px").max(2000, "Height cannot exceed 2000px"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  text: z.string().min(1, "Text cannot be empty"),
  isVisible: z.boolean(),
});

const initialProperties: ElementProperties = {
  x: 50,
  y: 500,
  width: 150,
  height: 100,
  color: '#3b82f6',
  text: 'Sample Element',
  isVisible: true,
};

const Canvas = () => {
  const form = useForm<ElementProperties>({
    resolver: zodResolver(formSchema),
    defaultValues: initialProperties,
  });

  return (
    <FormProvider {...form}>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <DynamicElementInspector />
        <div className="flex-1 flex flex-col">
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Canvas</h2>
            <p className="text-gray-600">Visual representation updates in real-time</p>
          </div>
          <div className="flex-1 relative">
            <CanvasGrid />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default Canvas