export interface Item {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface DynamicDataTableProps {
  data: Item[];
  visibleColumns?: string[];
  onColumnVisibilityChange?: (visibleColumns: string[]) => void;
}

export interface ColumnConfig {
  key: keyof Item;
  label: string;
  type: 'string' | 'number' | 'status';
}