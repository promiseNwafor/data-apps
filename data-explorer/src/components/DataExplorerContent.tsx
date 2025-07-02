import React from 'react';
import DataTable from './DataTable';
import ControlPanel from './ControlPanel';
import AggregationTable from './AggregationTable';
import FileUpload from './FileUpload';
import CustomBarChart from './BarChart';
import { BarChart3, Table, FileSpreadsheet, Filter, ArrowUpDown } from 'lucide-react';
import { useDataExplorer } from '../context/useDataExplorer';

const DataExplorerContent: React.FC = () => {
  const {
    csvData,
    fileName,
    parsedData,
    transformedData,
    aggregationData,
    isPending,
    filter,
    sort,
    showAggregation,
    aggregateColumn,
    showChart,
    handleFileUpload,
    clearData,
  } = useDataExplorer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Data Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            Powerful CSV data analysis and visualization tool
          </p>
        </div>
        
        {!csvData && (
          <FileUpload onFileUpload={handleFileUpload} isLoading={isPending} />
        )}
        
        {csvData && parsedData.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <p className="text-red-600 text-xl">Failed to parse CSV data</p>
          </div>
        )}
        
        {parsedData.length > 0 && (
          <div className="space-y-8">
            {/* File Info Header */}
            {fileName && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium text-gray-900">Currently viewing: {fileName}</span>
                  </div>
                  <button
                    onClick={clearData}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Upload New File
                  </button>
                </div>
              </div>
            )}

            {/* Data Summary */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Data Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{parsedData.length}</div>
                  <div className="text-sm opacity-90">Total Rows</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{transformedData.length}</div>
                  <div className="text-sm opacity-90">Filtered Rows</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{Object.keys(parsedData[0]).length}</div>
                  <div className="text-sm opacity-90">Columns</div>
                </div>
              </div>
            </div>
            
            {/* Control Panel */}
            <ControlPanel />
            
            {/* Aggregation Results */}
            {showAggregation && aggregationData.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                    Aggregation Results
                  </h2>
                  <AggregationTable data={aggregationData} aggregateColumn={aggregateColumn} />
                </div>
                
                {/* Chart Visualization */}
                {showChart && (
                  <div>
                    <CustomBarChart 
                      data={aggregationData}
                      aggregateColumn={aggregateColumn}
                      title="Data Visualization"
                      height={400}
                    />
                  </div>
                )}
              </div>
            )}
            
            {/* Filter & Sort Status */}
            {((filter.column && filter.value) || sort.column) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Active Transformations:</h3>
                <div className="flex flex-wrap gap-2">
                  {filter.column && filter.value && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Filter className="w-3 h-3 mr-1" />
                      {filter.column} {filter.operator} "{filter.value}"
                    </span>
                  )}
                  {sort.column && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      Sort by {sort.column} ({sort.direction})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Data Table */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Table className="w-5 h-5 mr-2 text-blue-600" />
                Data Table
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({transformedData.length} rows)
                </span>
              </h2>
              <DataTable 
                data={transformedData} 
                activeFilter={filter.column && filter.value ? filter : undefined}
                activeSort={sort.column ? sort : undefined}
              />
            </div>
            
            {/* Raw Data Section */}
            <details className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <summary className="text-lg font-semibold mb-2 cursor-pointer text-gray-900 hover:text-blue-600 transition-colors">
                Raw CSV Data
              </summary>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">{csvData}</pre>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExplorerContent;