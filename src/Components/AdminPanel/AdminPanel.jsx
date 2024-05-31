import { get, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { database } from "../../Firebase/firebase.mjs";
import { useEffect, useState } from "react";

export default function AdminPanel(){


    const [contacts, setContacts] = useState({})

    function getContactsFromFirebase(){
        async function gozle(){
                onValue(ref(database, 'contacts/'), async result => {
                    if(result.exists()){
                        setContacts(result.val())
                    }else{
                        console.log('netu')
                    }
                })
        }
        gozle()
    }



    useEffect(()=>{
        getContactsFromFirebase()
    }, [])

    return(
        <>
            <main className="w-full h-full min-h-[100vh] bg-[#00132D] flex items-center relative justify-evenly">

                <article className="flex items-center justify-center w-[20%] h-full min-h-[800px] rounded-[15px] bg-[#00377E] p-[20px]">
                    <nav className="w-full h-[100%] min-h-[760px]">
                        <ul className="flex flex-col items-center justify-evenly w-full h-[100%] min-h-[760px]">

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/'}>Home Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100] " to={'/aboutUs'}>About Us Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/contactUs'}>Contact Us Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/reports'}>Reports Page</Link>
                            </li>
                            
                        </ul>
                    </nav>
                </article>






                <section className="w-[70%] h-full min-h-[800px] rounded-[15px] bg-[#00377E] p-[50px]">
                    <div className="flex w-full min-h-[500px] h-full p-[50px] bg-[#00132D] rounded-[15px]">
                        {Object.entries(contacts).map(([id, item]) => {return <div key={id}>
                            <h1>{JSON.parse(item).nameOfSender}</h1>
                        </div>})}
                    </div>
                </section>
            </main>
        </>
    )
}