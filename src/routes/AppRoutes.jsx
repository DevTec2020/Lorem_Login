import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, useContext } from "react";

import { Home } from "../Pages/Home";
import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";
import { AuthContext } from "../contexts/AuthContext";

// Protegendo a rota da Home, assim só acessa se tiver logado e também não acessa pela url
const Private = ({ Item }) => {

  // Pegando o estado de login se está logado isLogado = true
  const { isLogado } = useContext(AuthContext); 

  // Se logado, vai para a Home, senão fica no login
  return isLogado ? <Item /> : <Signin />; 
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default AppRoutes;
