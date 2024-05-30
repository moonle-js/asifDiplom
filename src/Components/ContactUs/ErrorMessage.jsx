export default function ErrorMessage({children}){
    return(
        <>
            <div className="w-[250px] h-[250px] rounded-[15px] bg-[#00377E] flex items-center justify-center absolute right-10 top-10 p-[20px]">
                <span className="text-[#FFD100] font-[600] flex item-center justify-center text-center">
                    {children}
                </span>
            </div>
        </>
    )
}