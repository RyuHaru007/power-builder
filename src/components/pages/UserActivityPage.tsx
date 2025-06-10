import React from 'react';
import { DataGrid } from '../common/DataGrid';
import { TableColumn } from '../../store/dataStore';

const columns: TableColumn[] = [
  { field: 'id', headerName: 'Activity ID', width: 120 },
  { field: 'name', headerName: 'Activity', width: 250 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'createdAt', headerName: 'Timestamp', width: 200 },
];

export const UserActivityPage: React.FC = () => {
  return (
    <DataGrid
      title="User Activity"
      endpoint="/api/user-activity"
      columns={columns}
    />
  );
};