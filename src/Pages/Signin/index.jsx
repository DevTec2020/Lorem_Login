import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx"; 
import ImgVitrineLogin from "../../assets/ImgVitrineLogin.jpg";
import ImgLogo from "../../assets/Logo.jpg";

export function Signin() {
    const { RealizarLogin } = useContext(AuthContext);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    // Função de submit do form para logar no sistema
    function FormSubmit(e) {
        e.preventDefault();

        const sucesso = RealizarLogin(usuario, senha);

        if (sucesso) {
            navigate("/home");
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen">
            <div className="hidden sm:block">
                <img className="h-screen w-full object-cover" src={ImgVitrineLogin} alt="Imagem Vitrine Login" />
            </div>
            <div className="sm:flex flex-col bg-gray-100 p-8 justify-center">
                <div className="flex justify-center items-center">
                    <img className="h-56 max-w-sm" src={ImgLogo} alt="Imagem da Logo" />
                </div>

                <div className="mt-12 flex flex-col items-center justify-center">
                    <form onSubmit={FormSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Login</label>
                            <input
                                type="text"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                                className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                            />
                        </div>
                        <button className="w-full py-2 bg-blue-950 rounded-lg text-center text-lg text-white font-semibold">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
