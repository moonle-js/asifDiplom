export default function Equipment({itemName, itemDateAdded, itemQuality}){

    let cislo = (Date.now() - Number(itemDateAdded));
    let bgColor = '';

    (100 - cislo/1000000) > 50 ? bgColor = 'green' : bgColor = "red";

    return(
        <div className="w-[80%] h-[100px] bg-[#00377E] rounded-[15px] flex items-center p-[20px]">
            <p className="min-w-[150px] w-[30%]">
                {itemName}
            </p>
            
            <p style={{width: `${100 - (cislo/1000000)}px`, backgroundColor: bgColor, height: "20px", borderRadius: '25px', marginLeft: "auto"}}>
                    
            </p>
        </div>
    )

}