import { get, onValue, set, ref, remove } from "firebase/database"
import { useCallback, useEffect, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"

export default function OilReports(){

    const [requests, setRequests] = useState([])

    useEffect(()=> {
        async function getRequests(){
            onValue(ref(database, 'requests'), async result => {
                if(result.exists()){
                    setRequests(result.val())
                }else{
                    setRequests([])
                }
            })
        }

        getRequests()
    }, [])

    const changeStatus = useCallback((item, status) => {
        get(ref(database, `requests/${item}`)).then(async result => {
            if(result.exists()){
                set(ref(database, `requests/${item}/accepted`), !status)
            }
        })
    }, [requests])

    const deleteReport = useCallback((id) => {
        get(ref(database, 'requests')).then(async result => {
            if(result.exists()){
                for(let i in result.val()){
                    if(id == result.val()[i].idOfRequest){
                        await remove(ref(database, `requests/${id}`))
                    }
                }
            }
        })
    }, [requests])

    return(
        <section className="flex flex-col mt-[20px] bg-[#00132D] rounded-[15px] min-h-[800px] p-[20px] items-start justify-start gap-y-[30px]">
            <h2 className="font-[600] text-[22px]">
                Reports:
            </h2>
            
            {
                Object.entries(requests).map(([index, item]) => {
                    
                    
                    return (
                        <div key={index} className="relative flex items-center justify-between gap-x-[100px] bg-[#00377E] w-full min-h-[50px] rounded-[15px] pl-[15px] pr-[15px]">
                            <p className="min-w-[150px] w-[30%]">
                                {item.nameOfFilial1}
                            </p>

                            <span>
                                {item.dateSent1}
                            </span>

                            {
                                item.accepted ? <p className="w-[auto] min-w-[120px] justify-center h-[30px] flex items-center rounded-[15px] pl-[15px] pr-[15px] bg-[green]">
                                    Accepted
                                </p> : <p className="w-[auto] min-w-[120px] justify-center h-[30px] flex items-center rounded-[15px] pl-[15px] pr-[15px] bg-[red]">
                                    Rejected
                                </p>
                            }
                            
                            <button 
                                className="bg-[#FFD100] min-w-[100px] justify-center text-[#00132D] font-[600] h-[30px] flex items-center rounded-[15px] pl-[15px] pr-[15px]"
                                onClick={() => {
                                    changeStatus(index, item.accepted)
                                }}
                            >
                                {item.accepted ? "Reject" : "Approve"}
                            </button>

                            <button onClick={() => {
                                deleteReport(item.idOfRequest)
                            }} className="absolute top-[-10px] right-0 bg-[#d90429] w-[20px] h-[20px] rounded-[50%] flex items-center justify-center font-[600]">x</button>
                        </div>
                    )
                }
                )
            }
        </section>
    )
}