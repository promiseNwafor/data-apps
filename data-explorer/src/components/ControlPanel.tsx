import React from 'react';
import { Settings, Filter, ArrowUpDown, BarChart3 } from 'lucide-react';
import type { FilterOption } from '../utils/dataTransforms';
import { getColumnNames, getColumnType } from '../utils/csvParser';
import { useDataExplorer } from '../context/DataExplorerContext';

const ControlPanel: React.FC = () => {
  const {
    parsedData,
    filter,
    sort,
    showAggregation,
    aggregateBy,
    aggregateColumn,
    showChart,
    setFilter,
    setSort,
    setShowAggregation,
    setAggregateBy,
    setAggregateColumn,
    setShowChart,
  } = useDataExplorer();
  
  const columns = getColumnNames(parsedData);
  const numericColumns = columns.filter(col => getColumnType(parsedData, col) === 'number');

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-blue-600" />
        Data Controls
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filter Section */}
        <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-lg font-medium text-purple-800 flex items-center">
            <Filter className="w-4 h-4 mr-2 text-purple-600" />
            Filter Data
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={filter.column}
              onChange={(e) => {
                const newColumn = e.target.value;
                const columnType = newColumn ? getColumnType(parsedData, newColumn) : 'string';
                const currentOperator = filter.operator;
                
                // Reset operator to 'equals' if current operator is not valid for the new column type
                let newOperator = currentOperator;
                if (columnType === 'string' && (currentOperator === 'greater' || currentOperator === 'less')) {
                  newOperator = 'equals';
                }
                
                setFilter({ 
                  ...filter, 
                  column: newColumn, 
                  value: '', 
                  operator: newOperator 
                });
              }}
              className="px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="">Select column</option>
              {columns.map(col => (
                <option key={col} value={col}>
                  {col} ({getColumnType(parsedData, col)})
                </option>
              ))}
            </select>
            
{(() => {
              const columnType = filter.column ? getColumnType(parsedData, filter.column) : 'string';
              return (
                <select
                  value={filter.operator}
                  onChange={(e) => setFilter({ ...filter, operator: e.target.value as FilterOption['operator'] })}
                  className="px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  disabled={!filter.column}
                >
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  {columnType === 'number' && (
                    <>
                      <option value="greater">Greater than</option>
                      <option value="less">Less than</option>
                    </>
                  )}
                </select>
              );
            })()}
          </div>
          
          <div className="space-y-2">
            <input
              type={filter.column && getColumnType(parsedData, filter.column) === 'number' && (filter.operator === 'greater' || filter.operator === 'less') ? 'number' : 'text'}
              placeholder={
                filter.column 
                  ? `${filter.operator === 'greater' || filter.operator === 'less' 
                      ? 'Enter number to compare' 
                      : `Filter ${filter.column} by ${filter.operator}...`}` 
                  : "Select a column first"
              }
              value={filter.value}
              onChange={(e) => setFilter({ ...filter, value: e.target.value })}
              disabled={!filter.column}
              className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {filter.column && filter.value && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-700">
                  Filtering: <span className="font-medium">{filter.column}</span> {filter.operator} "{filter.value}"
                </span>
                <button
                  onClick={() => setFilter({ column: '', value: '', operator: 'equals' })}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sort Section */}
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-medium text-green-800 flex items-center">
            <ArrowUpDown className="w-4 h-4 mr-2 text-green-600" />
            Sort Data
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={sort.column}
              onChange={(e) => setSort({ ...sort, column: e.target.value })}
              className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="">Select column to sort</option>
              {columns.map(col => (
                <option key={col} value={col}>
                  {col} ({getColumnType(parsedData, col)})
                </option>
              ))}
            </select>
            
            <select
              value={sort.direction}
              onChange={(e) => setSort({ ...sort, direction: e.target.value as 'asc' | 'desc' })}
              className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              disabled={!sort.column}
            >
              <option value="asc">A → Z (Ascending)</option>
              <option value="desc">Z → A (Descending)</option>
            </select>
          </div>
          
          {sort.column && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">
                Sorting by: <span className="font-medium">{sort.column}</span> ({sort.direction === 'asc' ? 'A → Z' : 'Z → A'})
              </span>
              <button
                onClick={() => setSort({ column: '', direction: 'asc' })}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Clear sort
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Aggregation Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-orange-600" />
            Aggregate Data
          </h3>
          
          <button
            onClick={() => setShowAggregation(!showAggregation)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showAggregation 
                ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showAggregation ? 'Hide' : 'Show'} Aggregation
          </button>
        </div>
        
        {showAggregation && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group by</label>
                <select
                  value={aggregateBy}
                  onChange={(e) => setAggregateBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aggregate column</label>
                <select
                  value={aggregateColumn}
                  onChange={(e) => setAggregateColumn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select numeric column</option>
                  {numericColumns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Chart Toggle */}
            {aggregateBy && (
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Show Chart Visualization</span>
                </div>
                <button
                  onClick={() => setShowChart(!showChart)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    showChart
                      ? 'bg-orange-200 text-orange-800 hover:bg-orange-300'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {showChart ? 'Hide Chart' : 'Show Chart'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;