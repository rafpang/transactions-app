// import React,  from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack } from "@mui/material";

interface IAddTransactionModal {
  openModal: boolean;
  handleClose: () => void;
  transactionTitle: string;
  transactionAmount: string;
  transactionCategory: string;
  setTransactionTitle: (e: string) => void;
  setTransactionAmount: (e: string) => void;
  setTransactionCategory: (e: string) => void;
  createNewTransaction: (e: any) => void;
}

export default function AddTransactionModal({
  openModal,
  handleClose,
  transactionTitle,
  createNewTransaction,
  transactionAmount,
  transactionCategory,
  setTransactionTitle,
  setTransactionAmount,
  setTransactionCategory,
}: IAddTransactionModal) {
  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the transaction details below.
        </DialogContentText>
        <Box
          component="form"
          noValidate
          onSubmit={createNewTransaction}
          sx={{ mt: 1 }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Description"
            onChange={(e) => setTransactionTitle(e.target.value)}
            value={transactionTitle}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            onChange={(e) => setTransactionAmount(e.target.value)}
            value={transactionAmount}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            onChange={(e) => setTransactionCategory(e.target.value)}
            value={transactionCategory}
            fullWidth
            variant="standard"
          />
          <Stack direction={"row-reverse"} mt={2}>
            <Button onClick={handleClose} color="error">
              Close
            </Button>
            <Button type="submit">Add</Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
