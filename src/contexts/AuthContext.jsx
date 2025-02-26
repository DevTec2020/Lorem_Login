import { createContext, useState } from "react";
import bcrypt from "bcryptjs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Inicializa como false (não logado)
    const [isLogado, setIsLogado] = useState(false);

    // Cria um usuário padrão se não existir
    if (!localStorage.getItem("usuario")) {
        const senhaCriptografada = bcrypt.hashSync("123", 5);
        localStorage.setItem(
            "usuario",
            JSON.stringify({ usuario: "Fortes", senha: senhaCriptografada })
        );
    }

    // Função para validar login e senha
    function RealizarLogin(usuarioDigitado, senhaDigitada) {
        const UserDefault = JSON.parse(localStorage.getItem("usuario"));
        const OtherUsers = JSON.parse(localStorage.getItem("CadastroUsuarios")) || [];

        // Verifica se o usuário existe no localstorage "usuario" ou em "CadastroUsuarios"
        const usuarioEncontrado =
            (UserDefault && UserDefault.usuario === usuarioDigitado) ||
            OtherUsers.some((user) => user.login === usuarioDigitado);

        if (!usuarioEncontrado) {
            alert("Usuário não encontrado!");
            return false;
        }

        // Verifica a senha
        let senhaCorreta = false;
        if (UserDefault && UserDefault.usuario === usuarioDigitado) {
            // Verifica a senha no "usuario"
            senhaCorreta = bcrypt.compareSync(senhaDigitada, UserDefault.senha);
        } else {
            // Verifica a senha em "CadastroUsuarios"
            const usuarioCadastrado = OtherUsers.find((user) => user.login === usuarioDigitado);
            if (usuarioCadastrado) {
                senhaCorreta = bcrypt.compareSync(senhaDigitada, usuarioCadastrado.senha);
            }
        }

        // Valida a senha
        if (senhaCorreta) {
            setUser(usuarioDigitado);
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
