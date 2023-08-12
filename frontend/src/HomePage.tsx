import { useAtom } from "jotai";
import { LoggedInAtom } from "./loggedInAtom";
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
  const [isLoggedIn, setIsLoggedIn] = useAtom(LoggedInAtom);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Login useEffect
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  //Fetch transactions useEffect
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const authTokenFromCookie = Cookies.get("auth_token");
        const requestHeaders = {
          Authorization: `Bearer ${authTokenFromCookie}`,
        };

        const response = await axios.get("http://localhost:3333/transaction", {
          headers: requestHeaders,
        });

        setTransactions(response.data);

        console.log(transactions);
      } catch (error) {}
    }
    fetchTransactions();
  }, []);

  const rows = [
    {
      id: "uuid-1",
      // userId: "user-1",
      createdAt: "2023-08-11T10:00:00Z",
      updatedAt: "2023-08-11T14:30:00Z",
      category: "Expense",
      amount: 250.75,
      title: "Groceries",
    },
    {
      id: "uuid-2",
      // userId: "user-2",
      createdAt: "2023-08-10T15:45:00Z",
      updatedAt: "2023-08-11T12:15:00Z",
      category: "Income",
      amount: 1500.0,
      title: "Salary",
    },
    {
      id: "uuid-3",
      // userId: "user-3",
      createdAt: "2023-08-09T08:30:00Z",
      updatedAt: "2023-08-11T11:45:00Z",
      category: "Expense",
      amount: 35.5,
      title: "Coffee",
    },
    // Add more placeholder data as needed
  ];

  const handleLogout = () => {
    Cookies.remove("access_token");
    setIsLoggedIn(false);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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
      <AddTransactionModal
        openModal={openModal}
        handleClose={handleClose}
        // handleSubmit={handleSubmit}
      />
      <DataTable rows={rows} />
    </Container>
  );
}
