import { Link } from "react-router";

export function ErrorPage() {
    
    return(
        <div className="flex flex-col  w-full justify-center items-center h-screen ">
        <h1 className="text-white font-mono">Página não encontrada</h1>
        <h2 className="text-zinc-400  font-bold text-5xl">404...</h2>
        <p className="text-white font-mono">Você caiu em uma página que não existe!</p>
        
        <Link className="text-blue-500 font-bold  cursor-pointer" to="/">
            VOLTAR PARA HOME
        </Link>
        
        </div>
    )
}