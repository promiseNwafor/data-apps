'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  formId: string;
  formTitle: string;
  trigger: React.ReactNode;
}

export default function ShareModal({ formId, formTitle, trigger }: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Get the form URL, handling SSR
  const getFormUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/renderer/${formId}`;
    }
    return `/renderer/${formId}`;
  };
  
  const formUrl = getFormUrl();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Failed to copy:', error);
    }
  };

  const openInNewTab = () => {
    window.open(formUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Form</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Form Title
            </Label>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {formTitle}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-url" className="text-sm font-medium text-gray-700">
              Public Form Link
            </Label>
            <div className="flex gap-2">
              <Input
                id="form-url"
                value={formUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="px-3"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Anyone with this link can fill out your form
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={openInNewTab}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview Form
            </Button>
            <Button
              onClick={copyToClipboard}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}