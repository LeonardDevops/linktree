import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TiDelete } from "react-icons/ti";
import { db } from "../../services/FirebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, deleteDoc , doc } from "firebase/firestore";


 interface LinksProps{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;

}
 
 
 function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [bgLink, setBgLink] = useState ("");
    const [textColor, setTextColor] = useState("");
    const [links, setLinks] = useState<LinksProps[]>([])



   async function handleDeletLink(id:string) {
        
        const docRef = doc(db,"links", id);
        await deleteDoc(docRef);
        

    }


    useEffect(()=> {
        const linksRef = collection(db, "links");
        const querRef = query(linksRef, orderBy("created", "asc"))

        const unSub = onSnapshot(querRef, (snapshot)=> {

            const lista = [] as LinksProps[]

          snapshot.forEach((doc)=> {
            lista.push({
                id:doc.id,
                name: doc.data().nomeLink,
                url:doc.data().url,
                bg:doc.data().bg,
                color:doc.data().color


            })
          })

            setLinks(lista);          
        })

        return () => {
            unSub();
        }

    },[])


    async function handleRegister(e:FormEvent) {

        e.preventDefault();

        if(nameInput === '' || urlInput === ''){

            alert("prencha todos o campos")
            return;
        }

        addDoc(collection(db, "links"), {
            nomeLink:nameInput,
            url:urlInput,
            bg:bgLink,
            color:textColor,
            created: new Date()
        }).then(()=> {
            console.log('cadastrador com sucesso')

            setNameInput("")
            setUrlInput("")

        }).catch((erro)=> {
        
            console.log('erro', erro)
        })
       

    }


    return(
        <div className=" flex  flex-col items-center min-h-screen">
            <Header />

            <form 
            onSubmit={handleRegister}
            className="flex flex-col  w-4/5 mt-8 " >
                <label className="text-white font-medium mb-2 mt-2">Nome do Link </label>
                <Input 
                value={nameInput}
                onChange={(e)=> setNameInput(e.target.value)}
                placeholder="Digite o nome do Link" />
                <label className="text-white font-medium mb-2 mt-2">URL do Link </label>
                <Input 
                value={urlInput}
                type="url"
                onChange={(e)=> setUrlInput(e.target.value)}
                placeholder="www.teste.com.br" />

                <section className="flex w-ful justify-center">
                    <div className="flex flex-row justify-center items-center gap-5 w-full max-w-screen-md md:w-4/5">
                    <label className="text-white font-mono mb-2 mt-2 text-base">Fundo do Link</label>
                    <input type="color"
                    onChange={(e)=> setBgLink(e.target.value)}
                    value={bgLink}
                    />
                    <label className="text-white font-mono mb-2 mt-2 text-base">Texto do Link</label>
                    <input type="color"
                    onChange={(e)=> setTextColor(e.target.value)}
                    value={textColor}
                    />
                    </div>
                </section>
        {nameInput !== "" && (
                <div className=" flex flex-col items-center justify-start mb-7 p-1 border-gray-100/25 border rounded-sm ">
                <label className="text-white font-mono mb-2 mt-2 text-base">Preview link</label>
                    <article 
                    style={{marginTop:8 , marginBottom:8 , backgroundColor:bgLink}}
                    className="w-11/12  flex flex-col items-center justify-between bg-zinc-900 rounded-sm px-1 py-1 
                    transition-transform hover:scale-105" >
                    <a href="#"
                    className="text-base md:text-lg font-mono"
                    style={{color:textColor}}>{nameInput}</a>
                    </article>
                </div>

                    )}

                <button 
                type="submit"
                className="flex justify-center 
                items-center bg-green-500 
                rounded-sm text-white font-mono
                ">
                    cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white  mb-4 text-2xl mt-4">Meus Links</h2>
            {links.map((doc)=> (
                
                <article key={doc.id}
                style={{backgroundColor: doc.bg}}
                 className="flex justify-between w-4/5 mb-4 items-center py-1 px-1 gap-5">
                
                    <a style={{color:doc.color}} 

                    className=" max-w-3xl ml-40 ">{doc.name}</a>

                    <div className="flex justify-center">
                        <button
                        onClick={()=> handleDeletLink(doc.id)} 
                        className="mr-5 transition-transform hover:scale-125 
                        rounded-full bg-zinc-400 select-none cursor-pointer">
                        <TiDelete size={23} color="#000" />
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
    

}


export default Admin;
export type { LinksProps } 