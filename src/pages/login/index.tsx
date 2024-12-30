import { Link ,  useNavigate } from "react-router";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/FirebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(evento:FormEvent) {
        evento.preventDefault();

        if (email === '' || password === '') {
                alert("prencha todos os campos")
            return;
            }

            signInWithEmailAndPassword(auth, email , password)
            .then(()=>{
                navigate("/admin", {replace:true})
            }).catch((erro)=> {
                alert(erro)
            })

        console.log({
            email:email,
            password:password
        })
    }



  return (
    <div className="flex w-full h-screen  items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl ">
          Dev
          <span
            className="bg-gradient-to-r from-cyan-400  to-sky-600 bg-clip-text 
                   text-transparent "
          >
            Link
          </span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2" >

        <Input 
            placeholder="digite seu email.."
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
        />
        <Input
         placeholder="digite sua senha..." 
         type="password"
         value={password}
         onChange={(e)=> setPassword(e.target.value)}
         />
         


        <button className="h-9 bg bg-blue-500 rounded border-0 text-lg font-medium text-white">Acessar</button>
      </form>
    </div>
  );
}

export default Login;
