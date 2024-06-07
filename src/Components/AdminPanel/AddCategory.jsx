import { ref, set } from "firebase/database"
import { useCallback, useRef } from "react"
import { database } from "../../Firebase/firebase.mjs"
import {v4} from 'uuid'
import { useNavigate } from "react-router"

export default function AddCAtegory(){

    const navigateTo = useNavigate()

    const nameOfCategory = useRef()

    const addCategoryToFirebase = useCallback(async (name) => {
        console.log(name)
        await set(ref(database, `equipmentsCategories/${v4()}`), name)
    }, [nameOfCategory])

    return(
        <article className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#00132D]">
            <form className="w-[500px] h-[500px] bg-[#FFD100] rounded-[25px] flex flex-col items-center justify-evenly">
                <input
                ref={nameOfCategory}
                type="text"
                placeholder="Add name of Category..."
                className="w-[80%] h-[60px] rounded-[15px] bg-[#00132D] flex items-center justify-center text-center"
                >

                </input>

                <button 
                onClick={(e) => {
                    e.preventDefault()
                    if(nameOfCategory.current.value.length > 4){
                        addCategoryToFirebase(nameOfCategory.current.value)
                        navigateTo('/admin')
                    }else{
                        alert('Fill the prompts correctly')
                    }
                }}
                className="w-[80%] h-[40px] rounded-[15px] bg-[#00377E] flex items-center justify-center text-center">
                    Add
                </button>
            </form>
        </article>
    )
}