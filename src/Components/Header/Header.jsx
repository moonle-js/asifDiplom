import { Link } from "react-router-dom";

export default function Header(){
    return(
        <>
            <header className="w-[80%] rounded-[25px] mt-[20px] h-[100px] bg-[#00377E] pl-[10px] pr-[10px]">
                <nav className="w-full h-full flex items-center justify-center">
                    <ul className="w-full h-full flex items-center justify-between gap-x-[20px] ">
                        
                        {
                            [
                                ['Logo', '/'],
                                ['Equipments', 'equipments'],
                                ['About Us', 'aboutUs'],
                                ['Contact Us', 'contactUs'],
                                ['Partners', 'partners'],
                                ['Oil Detect', 'oilDetect'],
                            ].map(([text, url]) => (
                                <li key={text} className="transition ease-out duration-1000 flex-[2]  items-center hover:bg-[#ffba42]  rounded-[15px] justify-center flex text-[1.1em] font-[600] h-[50%]">
                                    <Link className="w-full h-full flex items-center justify-center" to={url}>{text}</Link> 
                                </li>
                            ))
                        }

                    </ul>
                </nav>
            </header>
        </>
    )
}