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
        <div className="flex flex-col items-center gap-y-[20px] w-full min-h-[500px] h-full p-[50px] bg-[#00132D] rounded-[15px]">
            {Object.entries(contacts).map(([id, item]) => {return (
            <div className="flex items-center justify-start gap-x-[55px] w-[90%] min-h-[100px] rounded-[15px] bg-[#FFD100]  overflow-y-hidden overflow-x-hidden" key={id}>
                
                <p className="min-w-[10%] font-[600] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).nameOfSender}
                </p>

                <p className="font-[600] min-w-[20%] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).emailOfSender}
                </p>

                <p className="font-[600] min-w-[20%] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).phoneNumberOfSender}
                </p>

                <p className="font-[600] min-w-[50%] text-[#00377E] pl-[10px]">
                    {JSON.parse(item).messageOfSender}
                </p>

            </div>
        )})}
        </div>
    )
}