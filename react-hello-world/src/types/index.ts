export interface Item {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface DynamicDataTableProps {
  data: Item[];
}

export interface ColumnConfig {
  key: keyof Item;
  label: string;
}