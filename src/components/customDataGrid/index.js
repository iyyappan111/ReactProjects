import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CustomDataGrid = ({
  rows,
  columns,
  loading,
  showCellVerticalBorder,
  showColumnVerticalBorder,
  processRowUpdate,
}) => {
  return (
    <DataGrid
    rows={rows}
    columns={columns}
    loading={loading}
    getRowId={getRowId}
    showCellVerticalBorder={showCellVerticalBorder}
    showColumnVerticalBorder={showColumnVerticalBorder}
    processRowUpdate={processRowUpdate}
/>
  );
};

export default CustomDataGrid;
