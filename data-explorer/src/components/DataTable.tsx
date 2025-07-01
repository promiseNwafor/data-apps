import React, { memo, useState, useMemo } from 'react';
import { Filter, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { DataRow } from '../utils/csvParser';

interface DataTableProps {
  data: DataRow[];
  pageSize?: number;
  activeFilter?: {
    column: string;
    value: string;
    operator: string;
  };
  activeSort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
}

const DataTable: React.FC<DataTableProps> = memo(({ data, pageSize = 50, activeFilter, activeSort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reset to first page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  
  const paginationInfo = useMemo(() => {
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRows);
    const displayData = data.slice(startIndex, endIndex);
    
    return {
      totalRows,
      totalPages,
      startIndex,
      endIndex,
      displayData,
      currentPage,
      pageSize
    };
  }, [data, currentPage, pageSize]);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data to display
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  const { displayData, totalRows, totalPages, startIndex, endIndex } = paginationInfo;
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToFirstPage = () => goToPage(1);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToLastPage = () => goToPage(totalPages);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                <div className="flex items-center">
                  {column}
                  {activeFilter?.column === column && activeFilter.value && (
                    <Filter className="w-3 h-3 ml-1 text-purple-500" />
                  )}
                  {activeSort?.column === column && (
                    activeSort.direction === 'asc' 
                      ? <ArrowUp className="w-3 h-3 ml-1 text-green-500" />
                      : <ArrowDown className="w-3 h-3 ml-1 text-green-500" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column}
                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                >
                  {typeof row[column] === 'number' 
                    ? row[column].toLocaleString() 
                    : String(row[column])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {endIndex} of {totalRows} entries
          </div>
          
          <div className="flex items-center space-x-2">
            {/* First Page */}
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            
            {/* Previous Page */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {(() => {
                const pages = [];
                const showPages = 5; // Show 5 page numbers at most
                let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                const endPage = Math.min(totalPages, startPage + showPages - 1);
                
                // Adjust start if we're near the end
                if (endPage - startPage + 1 < showPages) {
                  startPage = Math.max(1, endPage - showPages + 1);
                }
                
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        i === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}
            </div>
            
            {/* Next Page */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Last Page */}
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Simple row count for single page */}
      {totalPages === 1 && totalRows > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing all {totalRows} entries
        </div>
      )}
    </div>
  );
});

export default DataTable;