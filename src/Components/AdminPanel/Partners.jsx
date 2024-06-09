import { ref, set } from "firebase/database"
import { useRef } from "react"
import { database } from "../../Firebase/firebase.mjs"
import { v4 } from 'uuid'

export default function Partners(){

    const companyName = useRef()
    const dateAssigned = useRef()

    return(
        <section className="flex rounded-[15px] h-auto flex-col bg-[#00132D] mt-[50px] p-[20px] gap-[20px]">

            <form className="w-full h-[40%] flex items-start flex-wrap justify-start gap-[20px] justify-evenly">

                <div className="w-[45%] h-[150px] bg-[#00377E] rounded-[15px] p-[20px] flex flex-col itesm-center justify-evenly">
                    <label htmlFor="companyName">
                        Name of Company:
                    </label>
                    <input 
                    ref={companyName}
                    id="companyName"
                    type="text"
                    placeholder="Name of company..."
                    className="rounded-[25px] bg-[#00132D] text-[#fff] font-[600] h-[50px] pl-[10px] pr-[10px]"
                    >
                    </input>
                </div>

                <div className="w-[45%] h-[150px] bg-[#00377E] rounded-[15px] p-[20px] flex flex-col itesm-center justify-evenly">
                    <label htmlFor="dateAssigned">
                        Date Assigned
                    </label>
                    <input 
                    ref={dateAssigned}
                    id="dateAssigned"
                    type="date"
                    placeholder="Name of company..."
                    className="rounded-[25px] bg-[#00132D] text-[#fff] font-[600] h-[50px] pl-[10px] pr-[10px]"
                    >
                    </input>
                </div>




            </form>

            <button 
                className="bg-[#FFD100] rounded -[25px] w-[150px] h-[50px] self-center text-[#00132D] font-[600]"
                onClick={(e) => {
                    e.preventDefault()
                    if(companyName.current.value.trim().length > 5 && dateAssigned.current.value.trim()){
                        set(ref(database, `partners/${v4()}`), {companyName: companyName.current.value, dateAssigned: dateAssigned.current.value})
                        companyName.current.value = ""
                        dateAssigned.current.value = ""
                    }else{
                        alert('error with data')
                    }
                }}
            >Add partner</button>


            <article>
                
            </article>

        </section>        
    )
}