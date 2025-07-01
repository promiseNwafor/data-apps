import React from 'react';
import type { AggregationResult } from '../utils/dataTransforms';

interface AggregationTableProps {
  data: AggregationResult[];
  aggregateColumn?: string;
}

const AggregationTable: React.FC<AggregationTableProps> = ({ data, aggregateColumn }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
        No aggregation data to display
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-orange-50 to-yellow-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
              {data[0]?.groupBy || 'Group'}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Count
            </th>
            {aggregateColumn && (
              <>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Sum ({aggregateColumn})
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Average ({aggregateColumn})
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {String(row.value)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {row.count}
                </span>
              </td>
              {aggregateColumn && (
                <>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.sum !== undefined ? (
                      <span className="font-mono text-green-700">
                        {row.sum.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.average !== undefined ? (
                      <span className="font-mono text-purple-700">
                        {row.average.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AggregationTable;