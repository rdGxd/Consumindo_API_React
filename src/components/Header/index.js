import React from "react";
import { FaHome, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Nav } from "./styled";

function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 1);
}

export default function Header() {
  return (
    <Nav>
      <Link onClick={refreshPage} to="/">
        <FaHome size={24} />
      </Link>
      <Link onClick={refreshPage} to="/register">
        <FaUser size={24} />
      </Link>
      <Link onClick={refreshPage} to="/login">
        <FaSignInAlt size={24} />
      </Link>
    </Nav>
  );
}
