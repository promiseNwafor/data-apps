'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEstimatedTime } from '@/lib/utils/form-renderer-utils';

interface WelcomeScreenProps {
  title: string;
  description?: string;
  questionsCount: number;
  onStart: () => void;
}

export default function WelcomeScreen({ 
  title, 
  description, 
  questionsCount, 
  onStart 
}: WelcomeScreenProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
    >
      <div className="max-w-2xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button 
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            Start Survey
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
        
        <motion.p 
          className="text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Takes about {getEstimatedTime(questionsCount)} minutes
        </motion.p>
      </div>
    </motion.div>
  );
}