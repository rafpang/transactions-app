import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", transform: "scale(0.8)" }}
  ></Box>
);

interface IStatCard {
  transactionType: string;
}

export default function StatCard({ transactionType }: IStatCard) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color={
            transactionType === "Income"
              ? "green"
              : transactionType === "Expense"
              ? "red"
              : "black"
          }
          fontWeight={"bold"}
        >
          {transactionType}
        </Typography>

        <Typography variant="body2" color="green">
          well meaning and kindly.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
