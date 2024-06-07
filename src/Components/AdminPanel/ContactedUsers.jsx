import { get, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { database } from "../../Firebase/firebase.mjs";
import { useEffect, useState } from "react";

export default function ContactedUsers(){

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
        <article className="flex flex-wrap items-center justify-start gap-y-[60px] gap-x-[10%] w-full min-h-[500px] h-full p-[50px] bg-[#00132D] rounded-[15px]">
            {Object.entries(contacts).map(([id, item]) => {return (
            <div className="flex flex-col items-center justify-start gap-[20px] w-[45%] h-[250px] rounded-[15px] p-[20px] bg-[#FFD100]  overflow-y-hidden overflow-x-hidden" key={id}>
                
                <p className="min-w-[10%] font-[600] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).nameOfSender}
                </p>

                <p className="font-[600] min-w-[20%] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).emailOfSender}
                </p>

                <p className="font-[600] min-w-[20%] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).phoneNumberOfSender}
                </p>

                <p className="font-[600] min-w-[100%] text-[#fff] pl-[10px] bg-[#00377E] rounded-[15px] p-[10px]">
                    {JSON.parse(item).messageOfSender}
                </p>

            </div>
        )})}
        </article>
    )
}