import React from 'react';
import { DataExplorerProvider } from '../context/DataExplorerContext';
import DataExplorerContent from './DataExplorerContent';

interface DataExplorerProps {
  csvData?: string;
}

const DataExplorer: React.FC<DataExplorerProps> = ({ csvData }) => {
  return (
    <DataExplorerProvider initialCsvData={csvData}>
      <DataExplorerContent />
    </DataExplorerProvider>
  );
};

export default DataExplorer;