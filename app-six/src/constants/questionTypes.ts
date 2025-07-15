import { Type, Mail, Hash, Phone, List, CheckSquare, Calendar, Star, ToggleLeft } from "lucide-react";
import { QuestionType } from "@/types";

export const questionTypes = [
  { type: QuestionType.TEXT, label: "Short Text", icon: Type, description: "Single line text input" },
  { type: QuestionType.EMAIL, label: "Email", icon: Mail, description: "Email address input" },
  { type: QuestionType.NUMBER, label: "Number", icon: Hash, description: "Numeric input" },
  { type: QuestionType.PHONE, label: "Phone", icon: Phone, description: "Phone number input" },
  { type: QuestionType.MULTIPLE_CHOICE, label: "Multiple Choice", icon: List, description: "Single selection from options" },
  { type: QuestionType.CHECKBOX, label: "Checkbox", icon: CheckSquare, description: "Multiple selections" },
  { type: QuestionType.DROPDOWN, label: "Dropdown", icon: List, description: "Dropdown selection" },
  { type: QuestionType.DATE, label: "Date", icon: Calendar, description: "Date picker" },
  { type: QuestionType.RATING, label: "Rating", icon: Star, description: "Star rating" },
  { type: QuestionType.YESNO, label: "Yes/No", icon: ToggleLeft, description: "Binary choice" },
];