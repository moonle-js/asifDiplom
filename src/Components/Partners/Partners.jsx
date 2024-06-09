import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"

export default function Partners(){


    const [partners, setPartners] = useState([])
    const [share, setShare] = useState(false)

    useEffect(() => {
        get(ref(database, 'partners')).then(result => {
            if(result.exists()){
                setPartners(result.val())
                setShare(true)
            }
        })
    }, [])


    return(
        <section className="flex w-full max-w-[1136px] bg-[#00377E] min-h-[500px] rounded-[25px] p-[50px] gap-[50px] flex-col items-center">
            {
                share ? 
                Object.entries(partners).map(([index, item]) => {
                    return(
                        <div className="w-[90%] h-[100px] flex items-center rounded-[25px] pl-[20px] pr-[20px] bg-[#00132D] justify-between">
                            <span>
                                {item.companyName}
                            </span>

                            <span>
                                {item.dateAssigned}
                            </span>
                        </div>
                    )
                }) : <span>
                    Nothing to share with
                </span>
            }
        </section>
    )
}