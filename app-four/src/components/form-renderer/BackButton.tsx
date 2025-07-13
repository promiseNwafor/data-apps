'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onBack: () => void;
  show: boolean;
}

export default function BackButton({ onBack, show }: BackButtonProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed top-6 left-6 z-40"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
    </motion.div>
  );
}