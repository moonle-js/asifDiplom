import { useState, useEffect } from 'react';
import { ref, get, child, onValue } from 'firebase/database'
import { database } from '../../Firebase/firebase.mjs'
import { Link } from 'react-router-dom';

export default function AboutUs(){
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function goster(){
      try {
        onValue(ref(database, 'aboutUs/'),async response => {
              if(response.exists()){
                setData({...response.val()})
                setLoading(false)
              }else{
                setError(true);
                setLoading(false)
              }
          }
      )
      }catch (error) {
        setError(true);
      }
    }

    goster()

  }, []);



  if(loading){
    return (
      <>
        <span>
          Loading
        </span>
      </>
    )
  }else if (error){
    return (
      <>
        <span>Catched error</span>
        <Link className='w-[150px] h-[50px] bg-[#ffba42] rounded-[15px] flex items-center justify-center' to={'/'}>Go Home</Link>
      </>
    )
  }else{
    return(
      <>
          <section className='w-full flex items-center justify-between'>

            <div className='flex items-center justify-center w-[50%] h-[full] bg-[#00377E] min-h-[500px] rounded-[15px] p-[30px]'>
              <p className='flex flex-col gap-y-[20px] items-center justify-center w-full h-full text-justify'>
                <span className='font-black text-[26px]'>Немного о Нас !</span>
                {data.description}
              </p>
            </div>


            <div className='flex flex-col items-end gap-y-[20px] w-[40%] h-full'>

              <div className='flex flex-row items-center justify-start min-w-[500px] gap-x-[10px] min-h-[75px] bg-[#00377E] rounded-[15px] pl-[20px]' >   
                <span className='text-[#FFD100] font-[600]'>
                  Our name: 
                </span>
                <p>
                  {data.nameOfCompany}
                </p>
              </div>

              <div className='flex flex-row items-center justify-start min-w-[500px] gap-x-[10px] min-h-[75px] bg-[#00377E] rounded-[15px] pl-[20px]' >   
                <span className='text-[#FFD100] font-[600]'>
                  Date Foundation: 
                </span>
                <p>
                  {data.dateOfRelease}
                </p>
              </div>

              <div className='flex flex-row items-center justify-start min-w-[500px] gap-x-[10px] min-h-[75px] bg-[#00377E] rounded-[15px] pl-[20px]' >   
                <span className='text-[#FFD100] font-[600]'>
                  Our main City: 
                </span>
                <p>
                  {data.mainOfficeLocation}
                </p>
              </div>

              <div className='flex flex-row items-center justify-start min-w-[500px] gap-x-[10px] min-h-[75px] bg-[#00377E] rounded-[15px] pl-[20px]' >   
                <span className='text-[#FFD100] font-[600]'>
                  Owner's name: 
                </span>
                <p>
                  {data.owner}
                </p>
              </div>

              <div className='flex flex-row items-center justify-start min-w-[500px] gap-x-[10px] min-h-[205px] bg-[#00377E] rounded-[15px] pl-[20px] pr-[20px]' >   
                <span className='text-[#FFD100] font-[600]'>
                  Our location: 
                </span>
                <iframe src={data.address} frameBorder="0" className='rounded-[15px] ml-auto'></iframe>
              </div>


            </div>


          </section>
          
      </>
  )
  }

    
}