import { get, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { database } from "../../Firebase/firebase.mjs";
import { useEffect, useState } from "react";
import ContactedUsers from "./ContactedUsers";
import EquipmentsLis from "./EquipmentsList";

export default function AdminPanel(){

    return(
        <>
            <main className="w-full h-full min-h-[100vh] bg-[#00132D] flex items-start pt-[8vh] relative justify-evenly">
                <article className="flex items-center justify-center w-[20%] h-full min-h-[800px] rounded-[15px] bg-[#00377E] p-[20px]">
                    <nav className="w-full h-[100%] min-h-[760px]">
                        <ul className="flex flex-col items-center justify-evenly w-full h-[100%] min-h-[760px]">

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/'}>Home Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100] " to={'/aboutUs'}>About Us Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/contactUs'}>Contact Us Page</Link>
                            </li>

                            <li>
                                <Link className="font-black text-[18px] hover:text-[#FFD100]" to={'/reports'}>Reports Page</Link>
                            </li>
                            
                        </ul>
                    </nav>
                </article>



                <section className="w-[70%] h-full min-h-[800px] rounded-[15px] bg-[#00377E] p-[50px]">
                    <ContactedUsers></ContactedUsers>
                    <EquipmentsLis></EquipmentsLis>
                </section>
            </main>
        </>
    )
}