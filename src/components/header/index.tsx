import { MdExitToApp } from "react-icons/md";
import { Link  } from "react-router";
import { signOut  } from "firebase/auth"
import { auth } from "../../services/FirebaseConnection";



export function Header() {
  

  
async function handleLogout() {
  
   await signOut(auth) // deslogar usuário conectado ao banco
  
  localStorage.clear() // limpar os dados do usuário ao deslogar 


}


  return (
    <header className="w-full  flex  flex-row bg-slate-600 items-center py-1 justify-center gap-4">
      <nav className="w-full flex">
        <div className="w-full flex items-center gap-6 justify-center text-white font-mono">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/networks">Redes-sociais</Link>
          <button onClick={handleLogout}>
          <MdExitToApp size={25} color="#FFF" />
        </button>
        </div>
      </nav>
    </header>
  );
}
