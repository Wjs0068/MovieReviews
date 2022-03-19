import React from "react";
import "./Navbar.css";

import LoginButton from "./Login.js";
import LogoutButton from "./Logout.js";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isAuthenticated } = useAuth0();

  const handleTitle = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h2 onClick={handleTitle} className="header-two">
            Movie Reviews
          </h2>
        </div>
        <div className="navbar-right">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
