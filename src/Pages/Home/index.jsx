import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Side";

export function Home() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [loginEditado, setLoginEditado] = useState("");
    const [senhaEditado, setSenhaEditado] = useState("");


    // Carregando usuários salvos do localStorage
    useEffect(() => {
        const usuariosSalvos = localStorage.getItem("CadastroUsuarios");
        if (usuariosSalvos) {
            setUsuarios(JSON.parse(usuariosSalvos));
        }
    }, []);

    // Função para deletar usuário
    const deletarUsuario = (id) => {
        const confirmarExclusao = confirm("Tem certeza que deseja excluir este usuário?");
        if (!confirmarExclusao) return;

        // Filtra a lista de usuários, removendo o usuário com o ID correspondente
        const usuariosAtualizados = usuarios.filter((user) => user.id !== id);

        // Atualiza o localStorage
        localStorage.setItem("CadastroUsuarios", JSON.stringify(usuariosAtualizados));

        // Atualiza o estado
        setUsuarios(usuariosAtualizados);
        alert("Usuário excluído com sucesso!");
    };

    // Função para abrir o modal de edição
    const abrirModalEdicao = (usuario) => {
        setUsuarioEditando(usuario);
        setLoginEditado(usuario.login);
        setSenhaEditado(usuario.senha);
    };

    // Função para salvar as alterações
    const salvarEdicao = () => {
        if (!loginEditado.trim()) {
            alert("O campo de login não pode estar vazio!");
            return;
        }

        // Atualiza o usuário na lista de usuários
        const usuariosAtualizados = usuarios.map((user) =>
            user.id === usuarioEditando.id ? { ...user, login: loginEditado } : user
        );

        // Atualiza o localStorage
        localStorage.setItem("CadastroUsuarios", JSON.stringify(usuariosAtualizados));

        // Atualiza o estado
        setUsuarios(usuariosAtualizados);
        setUsuarioEditando(null); // Fecha o modal de edição
        alert("Usuário atualizado com sucesso!");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Listagem de Usuários Cadastrados
                    </h1>

                    {usuarios.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 font-semibold">
                                <tr>
                                    <th className="p-1 text-center">ID</th>
                                    <th className="p-1 text-center">Data de Cadastro</th>
                                    <th className="p-1 text-center">Login</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="p-1 text-center">{user.id}</td>
                                        <td className="p-1 text-center">{user.dataCadastro}</td>
                                        <td className="p-1 text-center">{user.login}</td>
                                        <td>
                                            <span
                                                className="text-blue-600 cursor-pointer font-semibold hover:text-blue-800"
                                                onClick={() => abrirModalEdicao(user)}
                                            >
                                                Editar
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className="text-red-600 cursor-pointer font-semibold hover:text-red-800"
                                                onClick={() => deletarUsuario(user.id)} 
                                            >
                                                Excluir
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500">
                            Nenhum usuário cadastrado.
                        </p>
                    )}
                </div>
            </div>

            {/* Modal de Edição */}
            {usuarioEditando && (
                <div className="fixed inset-0 bg-gray-600/75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

                        {/* Campo de Login */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Login
                            </label>
                            <input
                                type="text"
                                value={loginEditado}
                                onChange={(e) => setLoginEditado(e.target.value)}
                                className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            />
                        </div>

                        {/* Campo de Senha */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Senha
                            </label>
                            <input
                                type="Password"
                                value={senhaEditado}
                                onChange={(e) => setSenhaEditado(e.target.value)}
                                className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            />
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setUsuarioEditando(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={salvarEdicao}
                                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}