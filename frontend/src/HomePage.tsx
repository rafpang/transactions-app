import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

import DataTable from "./components/DataTable";
import { Container, Stack } from "@mui/material";

import AddTransactionModal from "./components/AddTransactionModal";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import axios from "axios";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authCookie = Cookies.get("access_token");
    if (!authCookie) {
      navigate("/login");
      return;
    }
    async function fetchTransactions() {
      try {
        const requestHeaders = {
          Authorization: `Bearer ${authCookie}`,
        };

        const response = await axios.get("http://localhost:3333/transaction", {
          headers: requestHeaders,
        });
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTransactions();
  }, []);

  function handleLogout() {
    Cookies.remove("access_token");
    navigate("/login");
  }

  function handleClickOpen() {
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "80%",
      }}
    >
      <Navbar handleLogout={handleLogout} />
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={2}
        justifyContent={{ md: "space-around" }}
        marginBottom={8}
      >
        <StatCard transactionType="Income" value={20} />
        <StatCard transactionType="Overall" value={20} />
        <StatCard transactionType="Expense" value={20} />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 2 }}
      >
        <Button
          sx={{ width: "200px" }}
          variant="text"
          onClick={handleClickOpen}
        >
          Add Transaction
        </Button>
      </Stack>
      <AddTransactionModal openModal={openModal} handleClose={handleClose} />
      <DataTable rows={transactions} />
    </Container>
  );
}
