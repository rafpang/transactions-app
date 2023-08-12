import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

interface IStatCard {
  transactionType: string;
  value: number;
}

export default function StatCard({ transactionType, value }: IStatCard) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ fontSize: "1.2rem" }}
          component="div"
          color={
            transactionType === "Income"
              ? "#8bc34a"
              : transactionType === "Expense"
              ? "#f50057"
              : "black"
          }
          fontWeight={"bold"}
        >
          {transactionType}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {transactionType} amount in SGD
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            sx={{ fontSize: "1.7rem" }}
            component="div"
            color={
              transactionType === "Income"
                ? "#8bc34a"
                : transactionType === "Expense"
                ? "#f50057"
                : "black"
            }
            fontWeight={"bold"}
          >
            {value}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  );
}
