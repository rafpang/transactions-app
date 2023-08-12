import LoginPage from "./LoginPage";
import SignUp from "./RegisterPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import HomePage from "./HomePage";

const defaultTheme = createTheme();

export default function App() {
  return (
    <JotaiProvider>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </JotaiProvider>
  );
}
