import { get, ref } from "firebase/database"
import { useCallback, useEffect, useRef, useState } from "react"
import { database } from "../../Firebase/firebase.mjs"
import Equipment from "./Equipment"

export default function Equipments(){

    const [categories, setCategories] = useState([])
    const requestedEquipments = useRef()
    const [shownElements, setShownElements] = useState([])
    const [noData, setNoData] = useState(false)

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

    const showRequestedEquipments = useCallback((category) => {
        get(ref(database, 'equipments/')).then(result => {
            if(result.exists()){
                for(let i in result.val()){
                    if(result.val()[i].category == category){
                        setShownElements(...shownElements, result.val())
                        console.log('tapdim')
                    }
                }
            }
        })
    }, [requestedEquipments])

    return(
        <>
            <section className="flex flex-col items-center justify-start gap-y-[50px] pt-[50px] pb-[50px] bg-[#00377E] rounded-[25px] w-[100%] min-h-[500px]">

                <form className="flex w-[90%] h-[100px] items-center justify-between bg-[#00132D] rounded-[15px] p-[10px]">
                    <div className="flex items-center justify-start w-[60%] h-[100%]">
                            <select ref={requestedEquipments} className="text-[#fff] relative bg-[#00377E] flex flex-row items-center justify-center rounded-[15px] w-[100%] h-[60%] text-center content-center cursor-pointer">
                                {
                                    categories.map((item) => {
                                        return (
                                            <option value={item} className=" flex items-center justify-center text-center text-[20px] p-[10px] w-[100%] leading-[40px] min-h-[20px] cursor-pointer" key={item}>
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
                        console.log('basildi')
                        setShownElements([])
                        showRequestedEquipments(requestedEquipments.current.value)
                    }
                    }
                    className="bg-[#ffba42] rounded-[15px] w-[20%] h-[60%] font-black">
                        Submit
                    </button>
                </form>

                    {console.log(Object.entries(shownElements))}

                <article className="bg-[#ffba42] w-[90%] min-h-[300px] rounded-[15px] p-[10px] flex flex-col items-center justify-start gap-y-[20px]">
                    {Object.entries(shownElements).map(([index, item]) => <Equipment key={index} itemQuality={item.quality} itemName={item.name}></Equipment>)}
                </article>

            </section>
        </>
    )
}