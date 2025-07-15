"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FormCardProps {
  form: {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    responseCount: number;
  };
  onEdit: (formId: string) => void;
  onDelete: (formId: string) => void;
  onViewResponses: (formId: string) => void;
  onShare: (formId: string) => void;
}

export default function FormCard({ form, onEdit, onDelete, onViewResponses, onShare }: FormCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{form.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(form.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewResponses(form.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Responses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShare(form.id)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(form.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {form.description && (
          <p className="text-sm text-gray-600 mb-3">{form.description}</p>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Created {formatDistanceToNow(form.createdAt, { addSuffix: true })}</span>
          <span>{form.responseCount} responses</span>
        </div>
      </CardContent>
    </Card>
  );
}