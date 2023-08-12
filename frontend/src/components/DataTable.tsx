import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "transactionId", headerName: "Transaction ID", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 300 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "amount", headerName: "Amount", type: "number", width: 100 },
  { field: "title", headerName: "Description", width: 200 },
];

interface IRowData {
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  amount: number;
  title: string;
}

export default function DataTable({ rows }: { rows: IRowData[] }) {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container
        sx={{
          width: "fit-content",

          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          getRowId={(row) => row.transactionId}
          columns={columns.map((col) => ({
            ...col,
            headerAlign: "center", // Center-align header names
            align: "center", // Center-align cell values
          }))}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </Container>
  );
}
