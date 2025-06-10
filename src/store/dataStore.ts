import { create } from 'zustand';
import axios from 'axios';

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface TableColumn {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  nextPageKeys: string[];
  hasNextPage: boolean;
  totalCount?: number;
}

interface DataState {
  data: TableRow[];
  columns: TableColumn[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  searchQuery: string;
  fetchData: (endpoint: string, search?: string, size?: number, nextPageKey?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  goToNextPage: (endpoint: string) => Promise<void>;
  goToPreviousPage: (endpoint: string) => Promise<void>;
  refreshData: (endpoint: string) => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  data: [],
  columns: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 0,
    pageSize: 10,
    nextPageKeys: [],
    hasNextPage: false
  },
  searchQuery: '',
  fetchData: async (endpoint: string, search?: string, size?: number, nextPageKey?: string) => {
    set({ loading: true, error: null });
    
    try {
      const params: any = {
        size: size || get().pagination.pageSize,
      };
      
      if (search) params.search = search;
      if (nextPageKey) params.nextPageKey = nextPageKey;
      
      // Mock API response - replace with actual axios call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockResponse = {
        data: Array.from({ length: params.size }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          name: `Item ${i + 1}`,
          status: Math.random() > 0.5 ? 'Active' : 'Inactive',
          createdAt: new Date().toISOString()
        })),
        nextPageKey: Math.random() > 0.3 ? `key-${Date.now()}` : null,
        totalCount: 100
      };
      
      set({
        data: mockResponse.data,
        pagination: {
          ...get().pagination,
          hasNextPage: !!mockResponse.nextPageKey,
          totalCount: mockResponse.totalCount
        },
        loading: false
      });
      
      // Store nextPageKey for pagination
      if (mockResponse.nextPageKey && !nextPageKey) {
        const { pagination } = get();
        set({
          pagination: {
            ...pagination,
            nextPageKeys: [...pagination.nextPageKeys, mockResponse.nextPageKey]
          }
        });
      }
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  goToNextPage: async (endpoint: string) => {
    const { pagination, searchQuery } = get();
    const nextPageKey = pagination.nextPageKeys[pagination.currentPage];
    
    await get().fetchData(endpoint, searchQuery, pagination.pageSize, nextPageKey);
    
    set({
      pagination: {
        ...pagination,
        currentPage: pagination.currentPage + 1
      }
    });
  },
  goToPreviousPage: async (endpoint: string) => {
    const { pagination, searchQuery } = get();
    
    if (pagination.currentPage === 1) {
      // Go back to first page
      await get().fetchData(endpoint, searchQuery, pagination.pageSize);
      set({
        pagination: {
          ...pagination,
          currentPage: 0
        }
      });
    } else {
      const prevPageKey = pagination.nextPageKeys[pagination.currentPage - 2];
      await get().fetchData(endpoint, searchQuery, pagination.pageSize, prevPageKey);
      set({
        pagination: {
          ...pagination,
          currentPage: pagination.currentPage - 1
        }
      });
    }
  },
  refreshData: async (endpoint: string) => {
    const { searchQuery, pagination } = get();
    set({
      pagination: {
        ...pagination,
        currentPage: 0,
        nextPageKeys: []
      }
    });
    await get().fetchData(endpoint, searchQuery, pagination.pageSize);
  }
}));