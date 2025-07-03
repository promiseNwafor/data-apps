import { createContext } from 'react';
import type { useDataTable } from '../hooks/useDataTable';

type DataTableContextType = ReturnType<typeof useDataTable>;

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);