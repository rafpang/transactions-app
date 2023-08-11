import { useAtom } from "jotai";
import { LoggedInAtom } from "./loggedInAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(LoggedInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  function handleLogout() {
    Cookies.remove("access_token");
    setIsLoggedIn(false);
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
