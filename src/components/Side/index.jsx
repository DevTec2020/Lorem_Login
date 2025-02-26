import ImgLogo from "../../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";

function LogOff(navigate) {
    const desejaSair = confirm("Deseja sair?");

    if (desejaSair) {
        navigate("/");
    }
}

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
            {/* Sidebar */}
            <aside className="group fixed top-0 left-0 h-full w-64 shadow-2xl bg-gray-100">
                {/* Itens */}
                <div className="flex-col mt-12 text-gray-800 font-semibold text-lg">
                    {/* Logo */}
                    <div className="flex justify-center items-center p-3">
                        <img className="object-cover" src={ImgLogo} alt="Imagem da Logo" />
                    </div>

                    {/* Item Home */}
                    <div
                        className="flex items-center hover:bg-blue-950 hover:text-white cursor-pointer gap-2"
                        onClick={() => navigate("/home")}
                    >
                        <span className="p-4">Home</span>
                    </div>

                    {/* Item Cadastrar */}
                    <div
                        className="flex items-center hover:bg-blue-950 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Signup")}
                    >
                        <span className="p-4">Cadastrar</span>
                    </div>

                    {/* Item Sair */}
                    <div
                        className="flex items-center hover:bg-blue-950 hover:text-white cursor-pointer"
                        onClick={() => LogOff(navigate)}
                    >
                        <span className="p-4">Sair</span>
                    </div>
                </div>
            </aside>
        </>
    );
}