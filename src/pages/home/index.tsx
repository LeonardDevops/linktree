import { Social } from "../../components/social";
import { FaLinkedin , FaInstagram , FaGithubSquare } from "react-icons/fa";
import { db } from "../../services/FirebaseConnection";
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LinksProps } from "../admin/index";


interface SocialLinksProps{
  linkedin:string;
  instagram:string;
  github:string;
}


function Home() {

  const [links , setLinks] = useState<LinksProps[]>([]);
  const[socialLinks, setSocialLinks] = useState<SocialLinksProps>();


  useEffect(()=> {

    function loadLinks() {
      const linksRef = collection(db,'links');
      const querRef = query(linksRef,orderBy("created","asc") )

      getDocs(querRef)
      .then((snapshot)=> {

        let lista =  [] as LinksProps[]

        snapshot.forEach((doc)=> {

          lista.push({
            id:doc?.id,
            name:doc.data().nomeLink,
            color:doc.data().color,
            url:doc.data().url,
            bg:doc.data().bg


          })

        })

        setLinks(lista)
      })
    } 
    loadLinks();

  },[])


  useEffect(()=> {
    function loadSocialLinks () {
    const docRef = doc(db,"social","link")
    getDoc(docRef)
    .then((snapshot)=> {

      if(snapshot.data() !== undefined){

        setSocialLinks({
          linkedin:snapshot.data()?.linkedin,
          instagram:snapshot.data()?.instagram,
          github:snapshot.data()?.github
        })
      }

    

    }).catch(()=> {

    })



   }

   loadSocialLinks();
  },[])


  return (
    <div className="flex  flex-col w-full py-4 items-center justify-center font-mono ">
      <h1 className=" md:text-4xl text-3xl text-white mt-20">Leonardo</h1>
      <span className=" text-sky-300 mb-5 mt-3">Veja meus Links</span>

      <main className=" flex flex-col w-11/12 max-w-xl text-center">

      {links.map((item)=> (
          <section
          style={{backgroundColor:item.bg}}
          key={item.id}
          className="bg-white mb-4 w-full 
                 rounded-sm transition-transform
                 hover:scale-105"
        >
          <a target="_blank"  
          href={item.url}>
            <p
             style={{color:item.color}} 
            className="text-base md:text-lg">{item.name}</p>
          </a>
        </section>
      ))}

      {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
          <Social url={socialLinks.linkedin}>
            <FaLinkedin size={35} color="#fff" />
          </Social>

          <Social url={socialLinks.instagram}>
            <FaInstagram size={35} color="#fff" />
          </Social>
          <Social 
          url={socialLinks.github}>
            <FaGithubSquare size={35} color="#fff" />
          </Social>
        </footer>
      )}
      </main>
    </div>
  );
}

export default Home;
