import { useRef, useState, useEffect, useCallback } from "react"
import { get, onValue, ref, remove, set } from "firebase/database"
import { database } from "../../Firebase/firebase.mjs"
import { v4} from 'uuid'
import { useNavigate } from "react-router"

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

    const navigateTo = useNavigate()

    const addEquipmentToFirebase = useCallback(() => {
        let currentDate = Date.now()
        let id = v4()
        set(ref(database, `equipments/${id}`), {elementId: id,name: equipmentsName.current.value, category: categoryOfEquipment.current.value, quality: 100, dateAdded: currentDate})
    }, [equipmentsName, categoryOfEquipment]) 

    const deleteEquipment = useCallback((id) => {
        remove(ref(database, `equipments/${id}`))
    }, [shownElements])

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
                            Object.entries(categories).map(([index, item]) => {
                                return (
                                    <option value={item} className=" flex items-center justify-center text-center text-[20px] p-[10px] w-[100%] leading-[40px] min-h-[20px] cursor-pointer" key={item}>
                                        {item}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="flex w-full items-center h-auto justify-evenly mt-[20px]">
                    <button className=" bg-[#FFD100] text-[#00132D] rounded-[15px] h-[50px] pl-[10px] pr-[10px] font-[600]"
                        onClick={(e) => {
                            e.preventDefault()
                            if(equipmentsName.current.value.length > 5){
                                addEquipmentToFirebase();
                                equipmentsName.current.value = ""
                            }else{
                                alert('Please fill the name prompt correctly')
                            }
                        }}
                    >
                        Add Equipment
                    </button>

                    <button 
                        onClick={() => navigateTo('/addCategory')}
                        className=" bg-[#FFD100] text-[#00132D] rounded-[15px] h-[50px] pl-[10px] pr-[10px] font-[600]"
                    >
                        Add Category
                    </button>
                </div>
                
            </form>

            <div className="flex flex-col itesm-center justify-start gap-y-[20px] w-full h-full">
                {
                    Object.entries(shownElements).map(([index, item]) => {
                        let cislo = (Date.now() - Number(item.dateAdded));
                        let bgColor = '';
                        var qualityCurrent = 100 - cislo/100000000

                        qualityCurrent > 50 ? bgColor = 'green' : bgColor = "red";

                        return (
                            <div key={index} className="flex items-center justify-between gap-x-[100px] bg-[#00377E] w-full min-h-[50px] rounded-[15px] pl-[15px] pr-[15px]">
                                <p className="min-w-[150px] w-[30%]">
                                    {item.name}
                                </p>

                                <p>
                                    {item.category}
                                </p>
                                
                                <p style={{width: `${qualityCurrent}px`, backgroundColor: bgColor, height: "20px", borderRadius: '25px', marginLeft: "auto"}}>
                                    
                                </p>

                                <button className="text-[#FFD100]" onClick={() => {
                                    deleteEquipment(index)
                                }}>
                                    Delete
                                </button>
                            </div>
                        )
                    }
                    
                    )
                }
            </div>
        </div>
    )
}