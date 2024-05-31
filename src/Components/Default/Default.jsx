import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Default(){
    return(
        <>
            <div className="w-full min-h-[100vh] bg-[#00132D] flex flex-col justify-between items-center">
                <Header></Header>
                    <main className='w-[80%] min-h-[calc(100vh-300px-10vh)] flex items-center justify-center mt-[5vh] mb-[5vh]'>
                        <Outlet></Outlet>
                    </main>
                <Footer></Footer>
            </div>
            
        </>
    )
}