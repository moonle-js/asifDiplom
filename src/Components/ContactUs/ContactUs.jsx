import { useCallback, useRef, useState } from "react"
import ErrorMessage from "./ErrorMessage"
import { ref, set } from "firebase/database"
import { database } from "../../Firebase/firebase.mjs"
import { v4 as uuidv4 } from 'uuid'


export default function ContactUs(){
    var nameOfSender = useRef()
    var emailOfSender = useRef()
    var phoneNumberOfSender = useRef()
    var messageOfSender = useRef()

    const [errorMessage, setErrorMessage] = useState('')

    const checkUserInfo = useCallback(()=> {
        var mailboxRegExpr = /\w+\@\w+\.\w+/g

        if(!nameOfSender.current.value.trim()){
            setErrorMessage(<ErrorMessage>Ad sehvdir</ErrorMessage>)
            return
        }

        if(!emailOfSender.current.value.trim() || !mailboxRegExpr.test(emailOfSender.current.value.trim())){
            setErrorMessage(<ErrorMessage>Mail sehvdir</ErrorMessage>)

            return
        }

        if(!phoneNumberOfSender.current.value.trim()){
            setErrorMessage(<ErrorMessage>Nomre sehvdir</ErrorMessage>)
            return
        }

        if(!messageOfSender.current.value.trim()){
            setErrorMessage(<ErrorMessage>Mesaj boshdur</ErrorMessage>)
            return
        }

            var userCredentials = {
                'nameOfSender': nameOfSender.current.value,'emailOfSender': emailOfSender.current.value, 'phoneNumberOfSender': phoneNumberOfSender.current.value, 'messageOfSender': messageOfSender.current.value
            }
            
            try{
                set(ref(database, `contacts/${uuidv4()}`), JSON.stringify(userCredentials))   
            }catch(error){
                setErrorMessage(<ErrorMessage>{error}</ErrorMessage>)    
            }
            finally{
                nameOfSender.current.value =""
                emailOfSender.current.value = ""
                phoneNumberOfSender.current.value = ""
                messageOfSender.current.value = ""
            }


        setErrorMessage(<ErrorMessage>Mesajiniz muveffeqiyyetle gonderildi</ErrorMessage>)

        
        
    }, [nameOfSender, emailOfSender, phoneNumberOfSender, messageOfSender])

    return(
        <>
            <section className="flex w-full h-full items-center justify-center">
                <form className="w-[80%] h-[60vh] min-h-[500px] bg-[#002657]  rounded-[25px] flex flex-col items-center justify-evenly relative">
                    <div className="w-full p-[20px] pl-[50px] flex flex-col items-start justify-evenly h-[80%] ">
                        <div className="flex items-center justify-start gap-x-[50px] h-[20%]">
                            <label htmlFor="nameOfSender">
                                Name:
                            </label>

                            <input 
                            ref={nameOfSender} 
                            id="nameOfSender" 
                            type="text" 
                            className="text-[#00132D] rounded-[15px] p-[10px] w-[350px] focus:border-2 focus:border-solid focus: border-[green]"
                            placeholder="Please add name..."
                            ></input>
                        </div>

                        <div className="flex items-center justify-start gap-x-[50px] h-[20%]">
                            <label htmlFor="emailOfSender">
                                Email:
                            </label>

                            <input 
                            ref={emailOfSender} 
                            id="emailOfSender" 
                            type="text" 
                            className="text-[#00132D] rounded-[15px] p-[10px] w-[350px] focus:border-2 focus:border-solid focus: border-[green]"
                            placeholder="Please add email.."
                            ></input>
                        </div>

                        <div className="flex items-center justify-start gap-x-[50px] h-[20%] ">
                            <label htmlFor="phoneNumberOfSender">
                                Phone Number:
                            </label>

                            <input 
                            ref={phoneNumberOfSender} 
                            id="phoneNumberOfSender" 
                            type="text" 
                            className="text-[#00132D] rounded-[15px] p-[10px] w-[350px] focus:border-2 focus:border-solid focus: border-[green]"
                            placeholder="Please add Phone Number ..."></input>
                        </div>

                        <div className="flex items-center justify-start w-full gap-x-[50px] h-[40%]">
                            <label htmlFor="messageOfSender">
                                Message:
                            </label>

                            <textarea 
                            ref={messageOfSender} 
                            id="messageOfSender" 
                            type="text" 
                            className="text-[#00132D] rounded-[15px] h-[100%] p-[10px] max-h-[100%] min-h-[50%] max-w-[550px] w-[60%] focus:border-2 focus:border-solid focus: border-[green]"
                            placeholder="What do you want to say?"
                            ></textarea>
                        </div>
                    </div>

                    <div className="w-full h-[20%] flex items-center justify-center">
                        <button className="w-[150px] rounded-[15px] bg-[#FFD100] h-[50px] text-[#00132D] font-[500]" onClick={(e) => {
                            e.preventDefault()
                            checkUserInfo()
                        }}>
                            Send Message
                        </button>
                    </div>
                    
                    {errorMessage}
                </form>
            </section>
        </>
    )
}