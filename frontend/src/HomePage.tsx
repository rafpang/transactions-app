import { useAtom } from "jotai";
import { LoggedInAtom } from "./loggedInAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

import DataTable from "./components/DataTable";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddTransactionModal from "./components/AddTransactionModal";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(LoggedInAtom);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn]);
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

  function handleLogout() {
    Cookies.remove("access_token");
    setIsLoggedIn(false);
  }

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
        gap: 2,
      }}
    >
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Open form dialog
      </Button>
      <AddTransactionModal
        openModal={openModal}
        handleClose={handleClose}
        // handleSubmit={handleSubmit}
      />
      <DataTable rows={rows} />
    </Container>
  );
}
