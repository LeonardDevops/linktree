import { auth } from "../services/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode , useEffect , useState } from "react";
import { Navigate } from "react-router";


interface PrivateProps{
    children:ReactNode
}



export function Private({children}:PrivateProps): any {
 const [loading, setLoading] = useState(true); //fazendo uma checagem se estiver logando inicia como true depois de logado passa pra false
 const [signed, setSigned] = useState(false); // se estiver logado passa pra true 


    useEffect(()=> { // vai iniciar o componente fazendo uma checagem no verificando autenticação e ser o usuario estiver autenticado
        const unsub = onAuthStateChanged(auth, (user)=> {
            if (user) {  // se o user for true  ele vai criar um objeto que armazena  o id do user e o email
                const userData ={
                    uid:user?.uid,
                    email:user.email

                }
                localStorage.setItem("@reactlinks", JSON.stringify(userData)) // depois armazena no localstorage 
                setLoading(false);// passa a state loading pra  false e signed pra true informando usuário está logado 
                setSigned(true);
            }else{
               setLoading(false); // se não  ele mantem  loading pra false 
               setSigned(false); //se o usuário não tiver logado 
            }
        })

        return () => {
            unsub(); // desmonta  o componente  desligando a  o olheiro que fica verificando usuário logado onAuthstateChanged
        }
    },[])



    if (loading) { // se loading  for true  vai retornar uma div em branco 
        return(
            <div>

            </div>
        )
    }

    if (!signed) { // se signed for falso  ele vai redirecnionar  para a pagina de login, agora se loading for true e singed for true
        return(
            <Navigate to="/login" />
        )
    }

  return children // ele vai retornar o children que é a rota privada 
}