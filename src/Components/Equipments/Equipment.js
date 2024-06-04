export default function Equipment({itemName, itemQuality}){

    let cislo = `${itemQuality}`;
    let bgColor = ''

    itemQuality > 50 ? bgColor = 'green' : bgColor = "red";

    return(
        <div className="w-[80%] h-[100px] bg-[#00377E] rounded-[15px] flex items-center p-[20px]">
            <p className="min-w-[150px] w-[30%]">
                {itemName}
            </p>
            
            <p style={{width: `${cislo}px`, backgroundColor: bgColor, height: "20px", borderRadius: '25px', marginLeft: "auto"}}>
                
            </p>
        </div>
    )
}