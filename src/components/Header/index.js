import React from "react";
import {
  FaHome,
  FaSignInAlt,
  FaUser,
  FaCircle,
  FaPowerOff,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import history from "../../services/history";

import { Nav } from "./styled";
import * as actions from "../../store/modules/auth/actions";

export default function Header() {
  // Disparador de ações
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    // Cancelando o evento padrão
    e.preventDefault();
    // Deslogando ousuário
    dispatch(actions.loginFailure());
    // Redirecionando o usuário para página inicial
    history.push("/");
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUser size={24} />
      </Link>

      {/* Checando se o usuário esta logado e trocando o icone */}

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {/* Se o usuário estiver logado vamos exibir uma COR VERDE no header */}
      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}
