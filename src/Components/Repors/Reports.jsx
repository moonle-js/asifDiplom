import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"

export  default function Reports(){

    const [dataFromFirebase, setDataFromFirebase] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getDetailsAboutRequests(){
            try{
                onValue(ref(database, 'requests'), async result => {
                    if(result.exists()){
                        setDataFromFirebase(result.val())
                        setLoading(false)
                    }
                })
            }catch(error){
                console.log("Some troubles from the server side")
            }
        }

        getDetailsAboutRequests()

    }, [])

   
    return(
        <>
            <section className="flex flex-col items-center justify-start gap-y-[20px] w-full min-h-[500px] h-full bg-[#00377E] rounded-[15px] p-[20px]">
                {
                    loading ? <h1>Loading...</h1> : 
                    Object.entries(dataFromFirebase).map(([id, item]) => {
                        return (
                            <div key={id} className="w-[80%] rounded-[15px] bg-[#00132D] h-[100px] p-[10px] flex items-center justify-between">

                                <div className="w-[40%] h-full flex justify-between items-center">
                                    <span>
                                        {item.nameOfFilial1}
                                    </span>

                                    <span>
                                        {item.dateSent1}
                                    </span>

                                </div>


                                <div className="w-[20%] h-[80%] rounded-[15px] border-[2px] border-solid border-[#fff] flex items-center justify-evenly">
                                    {item.accepted == true ?  
                                        <><div className="rounded-[100%] w-[20px] h-[20px] bg-[green]"></div><span>Accepted</span></> : 
                                        <><div className="rounded-[100%] w-[20px] h-[20px] bg-[red]"></div><span>Rejected</span></>}
                                </div>
                            </div>
                        )
                    })
                    
                     
                
                }
            </section>
        </>
    )
}