import { ref, set } from "firebase/database"
import { useCallback, useRef, useState, useEffect } from "react"
import { database } from "../../Firebase/firebase.mjs"
import { v4 } from 'uuid'

export default function OilDetect(){

    var nameOfFilial = useRef()
    var dateSent = useRef()
    var alkans = useRef()
    var sikloalkans = useRef()
    var aromatic = useRef()
    var smola = useRef()
    var sera = useRef()
    var azot = useRef()
    var kislorod = useRef()
    var metalls = useRef()

    const [ingredients, setIngredients] = useState()


    const changeIngredientsLocally = useCallback( () => {
        var nameOfFilial1 = nameOfFilial.current.value,
        dateSent1 = dateSent.current.value,
        alkans1 = Number(alkans.current.value),
        sikloalkans1 = Number(sikloalkans.current.value),
        aromatic1 = Number(aromatic.current.value),
        smola1 = Number(smola.current.value),
        sera1 = Number(sera.current.value),
        azot1 = Number(azot.current.value),
        kislorod1 = Number(kislorod.current.value),
        metalls1 = Number(metalls.current.value),
        accepted = true


        if(alkans1+sikloalkans1+aromatic1+smola1+sera1+azot1+kislorod1+metalls1 > 100){
            alert('100 faizden coxdur')
            return
        }

        if(
            alkans1 < 49 ||
            sikloalkans1 < 30||
            aromatic1 < 15||
            smola1 < 5 ||
            sera1 < 0.3||
            azot1 < 0.2||
            kislorod1 < 0.1 ||
            metalls1 < 0.01
        ){
            accepted = false
        }

        if(nameOfFilial1.trim().length < 5){
            alert('Adiniz duzgun qeyd edin')
            return
        }


        setIngredients({
            nameOfFilial1, dateSent1, alkans1, sikloalkans1, aromatic1, smola1, sera1, azot1, kislorod1, metalls1, 'accepted': accepted
        })


    }, [])


    
    useEffect(() => {
        async function gonder(){
            if(ingredients){
                try{
                    await set(ref(database, `requests/${v4()}`), JSON.stringify(ingredients))
         
                     nameOfFilial.current.value = ""
                     dateSent.current.value = ""
                     alkans.current.value = ""
                     sikloalkans.current.value = ""
                     aromatic.current.value = ""
                     smola.current.value = ""
                     sera.current.value = ""
                     azot.current.value = ""
                     kislorod.current.value = ""
                     metalls.current.value = ""
                 }catch(error){
                     console.log(error)
                 }
        }
        
        }
        
        gonder()

    }, [ingredients])

    return(
        <>
            <section className="flex flex-col w-full items-center justify-center h-full">
                <form className="w-full p-[50px] rounded-[25px] bg-[#00377E] h-full min-h-[500px] flex flex-wrap gap-y-[30px] items-center justify-evenly">

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Компания\Филиал
                        </label>

                        <input
                            ref={nameOfFilial}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="text"
                            placeholder="Название Филиала..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Дата:
                        </label>

                        <input
                            ref={dateSent}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="text"
                            placeholder="dd/mm/yyyy..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Алканов: 
                        </label>

                        <input
                            ref={alkans}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%] "
                            type="number"
                            placeholder="Алканы в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Циклоалканов:
                        </label>

                        <input
                            ref={sikloalkans}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Циклоалканы в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Ароматические углеводороды:
                        </label>

                        <input
                            ref={aromatic}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Углеводороды в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Смол:
                        </label>

                        <input
                            ref={smola}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Смолы в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Серы:
                        </label>

                        <input
                            ref={sera}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Сера в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Азота:
                        </label>

                        <input
                            ref={azot}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Азот в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Кислорода:
                        </label>

                        <input
                            ref={kislorod}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Кислород в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>

                    <div className="w-[40%] h-[80px] flex items-center justify-between p-[10px] bg-[#00132D] rounded-[15px]">
                        <label htmlFor="filialsName" className="w-[30%]">
                            Соотношение Металлов:
                        </label>

                        <input
                            ref={metalls}
                            className="bg-[#00377E] text-[#FFD100] placeholder:text-[#FFD100] pl-[10px] h-[80%] rounded-[15px] w-[60%]"
                            type="number"
                            placeholder="Металлы в %..."
                            required
                            id="filialsName"
                        >
                        </input>
                    </div>
                    
                </form>

                <button 
                    className="bg-[#FFD100] rounded-[15px] mt-[50px] w-[150px] h-[50px] text-[#00132D] font-[600]"
                    onClick={(e) => {
                        e.preventDefault()
                        changeIngredientsLocally()
                    }}
                >
                    Submit
                </button>
            </section>
        </>
    )
}