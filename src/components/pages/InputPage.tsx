import React from 'react';
import { DataGrid } from '../common/DataGrid';
import { TableColumn } from '../../store/dataStore';

const columns: TableColumn[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
];

export const InputPage: React.FC = () => {
  return (
    <DataGrid
      title="Input"
      endpoint="/api/input"
      columns={columns}
    />
  );
};