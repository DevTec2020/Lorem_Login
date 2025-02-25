import { createContext, useState } from "react";
import bcrypt from "bcryptjs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Aqui é o estado que controla o Private do login
  const [isLogado, setIsLogado] = useState(false);

  if (!localStorage.getItem("usuario")) {
    const senhaCriptografada = bcrypt.hashSync("123", 10);
    localStorage.setItem("usuario", JSON.stringify({ usuario: "Fortes", senha: senhaCriptografada }));
  }

  // Função para validar login e senha
  function RealizarLogin(usuarioDigitado, senhaDigitada) {
    const DadosDoLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    const senhaCorreta = bcrypt.compareSync(senhaDigitada, DadosDoLocalStorage.senha);

    // Valida Login
    if (!DadosDoLocalStorage || DadosDoLocalStorage.usuario !== usuarioDigitado) {
      alert("Usuário não encontrado!");
      return false;
    }

    // Valida Senha
    if (senhaCorreta) {
      setUser(DadosDoLocalStorage.usuario);
      alert("Login feito com sucesso!");

      // Atualiza o estado para true avisando que esta logado
      setIsLogado(true); 
      
      return true;
    } else {
      alert("Senha incorreta!");
      return false;
    }
  }

  // Função de sair do sistema
  function Logout() {
    setUser(null);
    setIsLogado(false);
    alert("Você saiu do sistema!");
  }

  // Exportando dados que serão usados no Contexto
  return (
    <AuthContext.Provider value={{ user, isLogado, RealizarLogin, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
