import { get, ref } from "firebase/database"
import { useCallback, useEffect, useRef, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"
import Equipment from "./Equipment"

export default function Equipments(){

    const [categories, setCategories] = useState([])
    const requestedEquipments = useRef()
    const [shownRequestedEquipments, setShownRequestedEquipments] = useState(false)
    const [shownElements, setShownElements] = useState([])

    useEffect(() => {
        async function getCategoriesFromFirebase(){
            get(ref(database, 'equipmentsCategories')).then(response => {
                if(response.exists()){
                    setCategories(response.val())
                }
            })

            get(ref(database, 'equipments')).then(response => {
                if(response.exists()){
                    setShownElements(response.val())
                }
            })
        }

        getCategoriesFromFirebase()
    }, [])


    return(
        <>
            <section className="flex flex-col items-center justify-start gap-y-[50px] pt-[50px] pb-[50px] bg-[#00377E] rounded-[25px] w-[100%] min-h-[500px]">

                <form className="flex w-[90%] h-[100px] items-center justify-between bg-[#00132D] rounded-[15px] p-[10px]">
                    <div className="flex items-center justify-start w-[60%] h-[100%]">
                            <select ref={requestedEquipments} className="text-[#fff] relative bg-[#00377E] flex flex-row items-center justify-center rounded-[15px] w-[100%] h-[60%] text-center content-center cursor-pointer">
                                {
                                    Object.entries(categories).map(([index, item]) => {
                                        return (
                                            <option value={item} className="flex items-center justify-center text-center text-[20px] p-[10px] w-[100%] leading-[40px] min-h-[20px] cursor-pointer" key={item}>
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                    </div>

                    <button 
                    onClick={ (e) =>{
                        e.preventDefault()
                        setShownRequestedEquipments(requestedEquipments.current.value)


                    }
                    }
                    className="bg-[#ffba42] rounded-[15px] w-[20%] h-[60%] font-black">
                        Submit
                    </button>
                </form>



                <article className="bg-[#ffba42] w-[90%] min-h-[300px] rounded-[15px] p-[10px] flex flex-col items-center justify-start gap-y-[20px]">
                    {
                    
                        shownRequestedEquipments ? 
                        Object.entries(shownElements).map(([index, item]) => {
                            if(item.category == requestedEquipments.current.value){
                                return <Equipment key={index} itemDateAdded={item.dateAdded} itemQuality={item.quality} itemName={item.name}></Equipment>
                            }

                        })
                        : 
                        Object.entries(shownElements).map(([index, item]) => {

                            return <Equipment key={index} itemDateAdded={item.dateAdded} itemQuality={item.quality} itemName={item.name}></Equipment>

                        })
                    
                    }
                </article>

            </section>
        </>
    )
}