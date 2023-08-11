import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "Transaction ID", width: 200 },
  // { field: "userId", headerName: "User ID", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 300 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "amount", headerName: "Amount", type: "number", width: 100 },
  { field: "title", headerName: "Description", width: 100 },
];

interface IRowData {
  id: string;
  // userId: string;
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
      <Container sx={[{ height: 400 }, { width: { md: "80%", xs: "100%" } }]}>
        <DataGrid
          rows={rows}
          // columns={columns}
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