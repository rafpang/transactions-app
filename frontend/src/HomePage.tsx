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
  const [transactions, setTransactions] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [transactionsSummary, setTransactionsSummary] = useState<any>({});

  const navigate = useNavigate();

  // States for new transsactions
  const [transactionTitle, setTransactionTitle] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [transactionCategory, setTransactionCategory] = useState<string>("");

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
    async function getTransactionSummary() {
      try {
        const requestHeaders = {
          Authorization: `Bearer ${authCookie}`,
        };

        const response = await axios.get(
          "http://localhost:3333/transaction/summary",
          {
            headers: requestHeaders,
          }
        );
        setTransactionsSummary({
          incomeSum: response.data.incomeSum,
          expenseSum: response.data.expenseSum,
          lumpedTransactionSummary: response.data.transactionSummary,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchTransactions();
    getTransactionSummary();
  }, []);

  async function createNewTransaction(e: any) {
    e.preventDefault();
    try {
      const authCookie = Cookies.get("access_token");
      const requestHeaders = {
        Authorization: `Bearer ${authCookie}`,
      };
      const parsedTransactionAmount = parseFloat(transactionAmount);
      if (isNaN(parsedTransactionAmount)) {
        console.log("transaction amount cannot be parsed!");
        return;
      }
      const postData = {
        title: transactionTitle,
        category: transactionCategory,
        amount: parsedTransactionAmount,
      };
      const newTransactionResponse = await axios.post(
        "http://localhost:3333/transaction",
        postData,
        {
          headers: requestHeaders,
        }
      );
      setTransactions((currentTransactions: any) => [
        ...currentTransactions,
        newTransactionResponse.data,
      ]);
      setTransactionTitle("");
      setTransactionAmount("");
      setTransactionCategory("");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

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
        <StatCard
          transactionType="Income"
          value={transactionsSummary.incomeSum}
        />
        <StatCard
          transactionType="Overall"
          value={transactionsSummary.lumpedTransactionSummary}
        />
        <StatCard
          transactionType="Expense"
          value={transactionsSummary.expenseSum}
        />
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
        createNewTransaction={createNewTransaction}
        setTransactionAmount={setTransactionAmount}
        setTransactionTitle={setTransactionTitle}
        setTransactionCategory={setTransactionCategory}
        transactionTitle={transactionTitle}
        transactionAmount={transactionAmount}
        transactionCategory={transactionCategory}
      />
      <DataTable rows={transactions} />
    </Container>
  );
}
