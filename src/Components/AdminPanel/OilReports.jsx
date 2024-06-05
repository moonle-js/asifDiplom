import { get, onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"

export default function OilReports(){

    const [requests, setRequests] = useState([])

    useEffect(()=> {
        async function getRequests(){
            onValue(ref(database, 'requests'), async result => {
                if(result.exists()){
                    setRequests(result.val())
                }
            })
        }

        getRequests()
    }, [])

    return(
        <>
        <span>salam</span>
            {
                Object.entries(requests).map(([index, item]) => <div>{item.alkans1}</div>)

            }
        </>
    )
}