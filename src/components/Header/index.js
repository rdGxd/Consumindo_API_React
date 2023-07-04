import React from "react";
import { FaHome, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
// Pegando os dados de dentro do estado
import { useSelector } from "react-redux";

import { Nav } from "./styled";

export default function Header() {
  const botaoClicado = useSelector((state) => state.example.botaoClicado);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUser size={24} />
      </Link>
      <Link to="youtube.com.br">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? "Clicado" : "Não clicado"}
    </Nav>
  );
}
