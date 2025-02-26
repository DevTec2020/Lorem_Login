import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { Sidebar } from "../../components/Side";


export function Signup() {
    const [usuarios, setUsuarios] = useState([]);
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    // Carregar usuários salvos do localStorage
    useEffect(() => {
        const usuariosSalvos = localStorage.getItem("CadastroUsuarios");
        if (usuariosSalvos) {
            setUsuarios(JSON.parse(usuariosSalvos));
        }
    }, []);

    // Função para salvar usuários no localStorage
    const saveLocalStorage = (updatedUsuarios) => {
        setUsuarios(updatedUsuarios);
        localStorage.setItem("CadastroUsuarios", JSON.stringify(updatedUsuarios));
    };


    // Função para gerar a ID
    function geraId(){
        let ultimoId = localStorage.getItem("ultimoId");
        if (!ultimoId) {
            ultimoId = 1;
        } else {
            ultimoId = parseInt(ultimoId, 10) + 1;
        }

        // Salva o novo ID no localStorage
        localStorage.setItem("ultimoId", ultimoId.toString());

        return ultimoId; // Retorna o novo ID
    };


    // Função para lidar com o envio do formulário
    const onSubmit = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        if (!login.trim() || !senha.trim()) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const novoUsuario = {
            id: geraId(),
            login,
            senha: bcrypt.hashSync(senha, 10),
            dataCadastro: new Date().toLocaleDateString(),
        };

        const updatedUsuarios = [...usuarios, novoUsuario];
        saveLocalStorage(updatedUsuarios);

        alert("Dados salvos com sucesso!");

        // Limpa o formulário
        setLogin("");
        setSenha("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Sidebar/>
            <div className="flex-1 flex flex-col items-center justify-center">
                <form
                    onSubmit={onSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Formulário de Cadastro
                    </h1>

                    {/* Campo Login */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Login
                        </label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            placeholder="Digite o login"
                            required
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            placeholder="Digite a senha"
                            required
                        />
                    </div>

                    {/* Botão de Enviar */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-950 rounded-lg text-center text-lg text-white font-semibold"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}