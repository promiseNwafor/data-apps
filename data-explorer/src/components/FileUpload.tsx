import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (csvContent: string, fileName: string) => void;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading = false }) => {
  const handleFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const text = await file.text();
      onFileUpload(text, file.name);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    }
  }, [onFileUpload]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFile(acceptedFiles[0]);
    }
  }, [handleFile]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isLoading
  });

  const handleSampleData = () => {
    const sampleData = `Region,Product,Sales,Date,Category,Price
North,Laptop,1200,2024-01-15,Electronics,899.99
South,Mouse,50,2024-01-20,Electronics,29.99
North,Keyboard,150,2024-01-22,Electronics,79.99
East,Laptop,1500,2024-02-01,Electronics,899.99
South,Laptop,1000,2024-02-05,Electronics,899.99
North,Mouse,75,2024-02-10,Electronics,29.99
West,Monitor,800,2024-02-12,Electronics,299.99
East,Keyboard,120,2024-02-14,Electronics,79.99
West,Mouse,45,2024-02-15,Electronics,29.99
South,Monitor,850,2024-02-18,Electronics,299.99
North,Tablet,600,2024-02-20,Electronics,449.99
East,Mouse,90,2024-02-22,Electronics,29.99`;
    onFileUpload(sampleData, 'sample-sales-data.csv');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragActive && !isDragReject
            ? 'border-blue-400 bg-blue-50 scale-[1.02] shadow-lg' 
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600 font-medium">Processing file...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait while we parse your CSV data</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              {isDragReject ? (
                <AlertCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
              ) : isDragActive ? (
                <Upload className="w-16 h-16 mx-auto text-blue-500 mb-4 animate-bounce" />
              ) : (
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {isDragActive ? 'Drop your CSV file here!' : 'Upload your CSV file'}
            </h3>
            
            <p className="text-gray-600 mb-8 text-lg">
              {isDragReject 
                ? 'Only CSV files are accepted'
                : isDragActive 
                ? 'Release to upload your file'
                : 'Drag and drop your CSV file here, or click to browse'
              }
            </p>
            
            <button 
              type="button"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Upload className="w-5 h-5 mr-3" />
              Choose CSV File
            </button>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                CSV files only
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Max 5MB file size
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Secure upload
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Sample Data Section */}
      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No CSV file handy?</h4>
          <p className="text-gray-600 mb-4">Try our sample sales data to explore all features</p>
          <button
            onClick={handleSampleData}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4 mr-2" />
            Load Sample Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;