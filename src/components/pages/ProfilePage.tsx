import React from 'react';
import { DataGrid } from '../common/DataGrid';
import { TableColumn } from '../../store/dataStore';

const columns: TableColumn[] = [
  { field: 'id', headerName: 'Setting ID', width: 120 },
  { field: 'name', headerName: 'Setting Name', width: 200 },
  { field: 'status', headerName: 'Value', width: 150 },
  { field: 'createdAt', headerName: 'Last Modified', width: 200 },
];

export const ProfilePage: React.FC = () => {
  return (
    <DataGrid
      title="Profile Settings"
      endpoint="/api/profile"
      columns={columns}
    />
  );
};