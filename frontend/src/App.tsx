import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignUpPage/SingUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/protected" element={ProtectedPage} /> */}
        {/* Protected route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
