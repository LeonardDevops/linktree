import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/FirebaseConnection";
import { setDoc, getDoc, doc } from "firebase/firestore";

function Networks() {

    const [linkedin, setLinkdin] = useState("");
    const [instagram, setInstagram] = useState("");
    const [github, setGithub] = useState("");


    useEffect(()=> {

        function loadLinks() {
            const docRef = doc(db,'social', 'link')
            getDoc(docRef)

            .then((snapshot)=> {

                if(snapshot.data()  !== undefined){
                    setGithub(snapshot.data()?.github)
                    setLinkdin(snapshot.data()?.linkedin)
                    setInstagram(snapshot.data()?.instagram)
                }

            }).catch(()=> {

            })
        }

        loadLinks();

    },[])


    async function handleRegister(e:FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            linkedin:linkedin,
            instagram:instagram,
            github:github
        }).then(()=> {
            console.log("cadastrado com sucesso");
        }).catch((erro)=> {
            console.log(erro, 'erro')
        })


        setGithub("");
        setInstagram("");
        setLinkdin("");
    }



 
    return(
        <div className=" flex  flex-col items-center min-h-screen">
            <Header/>

            <h1 
            className="text-white font-medium text-2xl mt-8 mb-4"
            >
           Minhas Redes Sociais</h1>

           <form
           onSubmit={handleRegister}
           className="flex flex-col max-w-xl w-full"
           >
            <label
            className="text-white font-mono mb-2 mt-2 "
            >Link do Linkedin</label>
            <Input 
            type="url"
            value={linkedin}
            onChange={(e)=> setLinkdin(e.target.value)}
            placeholder="Digite a Url do Likedin..."
            />
            <label

            className="text-white font-mono mb-2 mt-2 "
            >Link do Instagram</label>
            <Input 
            value={instagram}
            onChange={(e)=> setInstagram(e.target.value)}
            type="url"
            placeholder="Digite a Url do Instagram..."
            />

            <label
            className="text-white font-mono mb-2 mt-2 "
            >Link do Github</label>
            <Input 
            value={github}
            onChange={(e)=> setGithub(e.target.value)}
            type="url"
            placeholder="Digite a Url do Github..."
            />

            <button type="submit" 
            className="flex justify-center 
            items-center bg-green-500 
            rounded-sm text-white font-mono mb-7
            ">
            Salvar Links
            </button>
           </form>
        </div>
    )
    

}


export default Networks;