import React from 'react';
import { DataGrid } from '../common/DataGrid';
import { TableColumn } from '../../store/dataStore';

const columns: TableColumn[] = [
  { field: 'id', headerName: 'Job ID', width: 120 },
  { field: 'name', headerName: 'Job Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'createdAt', headerName: 'Started At', width: 200 },
];

export const ArtifactJobsPage: React.FC = () => {
  return (
    <DataGrid
      title="Artifact Jobs"
      endpoint="/api/artifact-jobs"
      columns={columns}
    />
  );
};