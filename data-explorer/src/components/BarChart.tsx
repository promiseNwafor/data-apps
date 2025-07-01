import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AggregationResult } from '../utils/dataTransforms';

interface BarChartProps {
  data: AggregationResult[];
  aggregateColumn?: string;
  title?: string;
  height?: number;
}

const CustomBarChart: React.FC<BarChartProps> = ({ 
  data, 
  aggregateColumn, 
  title = "Chart Visualization",
  height = 400 
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Chart Data</h3>
          <p className="text-gray-500">
            Configure aggregation settings to generate a chart visualization
          </p>
        </div>
      </div>
    );
  }

  // Transform data for Recharts
  const chartData = data.map(item => ({
    name: String(item.value),
    count: item.count,
    sum: item.sum || 0,
    average: item.average || 0,
  }));

  // Determine which metrics to show
  const showSum = aggregateColumn && data.some(item => item.sum !== undefined);
  const showAverage = aggregateColumn && data.some(item => item.average !== undefined);

  // Calculate summary stats
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);
  const totalSum = data.reduce((sum, item) => sum + (item.sum || 0), 0);
  const maxCount = Math.max(...data.map(item => item.count));
  const maxSum = Math.max(...data.map(item => item.sum || 0));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Chart Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-2">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          Data grouped by {data[0]?.groupBy} ({data.length} categories)
          {aggregateColumn && ` • Analyzing ${aggregateColumn}`}
        </p>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
              angle={data.length > 6 ? -45 : 0}
              textAnchor={data.length > 6 ? 'end' : 'middle'}
              height={data.length > 6 ? 80 : 60}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name === 'count' ? 'Count' : 
                name === 'sum' ? `Total ${aggregateColumn}` :
                name === 'average' ? `Avg ${aggregateColumn}` : name
              ]}
              labelFormatter={(label) => `${data[0]?.groupBy}: ${label}`}
            />
            <Legend />
            
            {/* Always show count */}
            <Bar 
              dataKey="count" 
              name="Count"
              fill="#3b82f6" 
              radius={[2, 2, 0, 0]}
            />
            
            {/* Show sum if available */}
            {showSum && (
              <Bar 
                dataKey="sum" 
                name={`Total ${aggregateColumn}`}
                fill="#10b981" 
                radius={[2, 2, 0, 0]}
              />
            )}
            
            {/* Show average if available */}
            {showAverage && (
              <Bar 
                dataKey="average" 
                name={`Avg ${aggregateColumn}`}
                fill="#f59e0b" 
                radius={[2, 2, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{data.length}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">{totalCount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Total Count</div>
        </div>
        {showSum && (
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">{totalSum.toLocaleString()}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total {aggregateColumn}</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {showSum ? maxSum.toLocaleString() : maxCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Highest {showSum ? aggregateColumn : 'Count'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBarChart;