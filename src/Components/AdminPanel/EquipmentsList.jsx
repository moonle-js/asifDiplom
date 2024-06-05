import { useRef, useState, useEffect, useCallback } from "react"
import { get, onValue, ref, set } from "firebase/database"
import { database } from "../../Firebase/firebase.mjs"
import { v4} from 'uuid'

export default function EquipmentsLis(){
    const [categories, setCategories] = useState([])
    const [shownElements, setShownElements] = useState([])

    const equipmentsName = useRef()
    const categoryOfEquipment = useRef()

    useEffect(() => {
        async function getCategoriesFromFirebase(){
            get(ref(database, 'equipmentsCategories')).then(response => {
                if(response.exists()){
                    setCategories(response.val())
                }
            })
        }

        onValue(ref(database, 'equipments'),async response => {
            if(response.exists()){
                setShownElements(response.val())
            }
        })

        getCategoriesFromFirebase()
    }, [])


    const addEquipmentToFirebase = useCallback(() => {
        let currentDate = Date.now()
        console.log(currentDate)
        set(ref(database, `equipments/${v4()}`), {name: equipmentsName.current.value, category: categoryOfEquipment.current.value, quality: 100, dateAdded: currentDate})
    }, [equipmentsName, categoryOfEquipment]) 

    return(
        <div className="flex flex-col mt-[20px] bg-[#00132D] rounded-[15px] min-h-[800px] p-[20px] items-start justify-start gap-y-[30px]">
            <h2 className="font-[600] text-[22px]">
                Equipments:
            </h2>

            <form className="flex flex-col items-start justify-evenly p-[20px] bg-[#00377E] w-[100%] rounded-[15px]">

                <div className="w-full h-[50px] flex items-center justify-between">
                    <label htmlFor="equpmentsName">Name of Equipment: </label>
                    <input 
                    ref={equipmentsName} 
                    type="text" 
                    id="equpmentsName" 
                    placeholder="Add name..." 
                    className="w-[350px] h-[40px] rounded-[15px] bg-[#00132D] text-[#fff] font-[600] pl-[20px] cursor-pointer"
                    ></input>
                </div>


                <div className="w-full h-[50px] flex items-center justify-between">
                    <label htmlFor="categoryOfEquipment">Category of Equipment</label>
                    <select 
                    ref={categoryOfEquipment} 
                    type="text" 
                    id="categoryOfEquipment" 
                    className="w-[350px] h-[40px] rounded-[15px] bg-[#00132D] text-[#fff] font-[600] pl-[20px] cursor-pointer"
                    >
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

                <button className="self-center bg-[#FFD100] text-[#00132D] rounded-[15px] h-[50px] pl-[10px] pr-[10px] font-[600] mt-[30px]"
                    onClick={(e) => {
                        e.preventDefault()
                        addEquipmentToFirebase();
                        equipmentsName.current.value = ""
                    }}
                >
                    Add Equipment
                </button>

            </form>

            <div className="flex flex-col itesm-center justify-start gap-y-[20px] w-full h-full">
                {
                    Object.entries(shownElements).map(([index, item]) => {
                        let cislo = (Date.now() - Number(item.dateAdded));
                        let bgColor = '';

                        (100 - cislo/1000000) > 50 ? bgColor = 'green' : bgColor = "red";

                        return (
                            <div key={index} className="flex items-center justify-between gap-x-[100px] bg-[#00377E] w-full min-h-[50px] rounded-[15px] pl-[15px] pr-[15px]">
                                <p className="min-w-[150px] w-[30%]">
                                    {item.name}
                                </p>

                                <p>
                                    {item.category}
                                </p>
                                
                                <p style={{width: `${100 - (cislo/1000000)}px`, backgroundColor: bgColor, height: "20px", borderRadius: '25px', marginLeft: "auto"}}>
                                    
                                </p>
                            </div>
                        )
                    }
                    
                    )
                }
            </div>
        </div>
    )
}