import React from 'react';
import { DataGrid } from '../common/DataGrid';
import { TableColumn } from '../../store/dataStore';

const columns: TableColumn[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Artifact Name', width: 250 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'createdAt', headerName: 'Generated At', width: 200 },
];

export const ArtifactOutputPage: React.FC = () => {
  return (
    <DataGrid
      title="Artifact Output"
      endpoint="/api/artifact-output"
      columns={columns}
    />
  );
};