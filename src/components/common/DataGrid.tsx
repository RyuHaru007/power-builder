import React, { useEffect } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDataStore, TableColumn, TableRow } from '../../store/dataStore';

interface DataGridProps {
  title: string;
  endpoint: string;
  columns: TableColumn[];
}

export const DataGrid: React.FC<DataGridProps> = ({ title, endpoint, columns }) => {
  const {
    data,
    loading,
    error,
    pagination,
    searchQuery,
    fetchData,
    setSearchQuery,
    goToNextPage,
    goToPreviousPage,
    refreshData
  } = useDataStore();

  useEffect(() => {
    // Set columns and fetch initial data
    fetchData(endpoint);
  }, [endpoint, fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchData(endpoint, query);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleRefresh = () => {
    refreshData(endpoint);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      goToNextPage(endpoint);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 0) {
      goToPreviousPage(endpoint);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Title Bar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        <div className="flex items-center space-x-4">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-80 pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search..."
            />
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-hidden">
        {error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-red-500 text-lg font-medium mb-2">Error Loading Data</div>
              <div className="text-gray-500 mb-4">{error}</div>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.field}
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style={{ width: column.width }}
                      >
                        {column.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-3 text-gray-500">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    data.map((row: TableRow, index: number) => (
                      <tr
                        key={row.id || index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {columns.map((column) => (
                          <td
                            key={column.field}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {row[column.field] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {pagination.currentPage + 1} of {pagination.totalCount ? Math.ceil(pagination.totalCount / pagination.pageSize) : '?'}
                {pagination.totalCount && (
                  <span className="ml-2">
                    ({pagination.totalCount} total items)
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={pagination.currentPage === 0 || loading}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage || loading}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};