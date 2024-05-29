import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Default(){
    return(
        <>
            <div className="w-full min-h-[100vh] bg-[#00132D] flex flex-col justify-between items-center">
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
            
        </>
    )
}