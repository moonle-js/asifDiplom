import { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database'
import { database } from '../../Firebase/firebase.mjs'
import { Link } from 'react-router-dom';

export default function AboutUs(){
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function goster(){
      try {
        get(ref(database, 'aboutUs/')).then(
          response => {
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
        <h1>
          Loading
        </h1>
      </>
    )
  }else if (error){
    return (
      <>
        <h1>Catched error</h1>
        <Link className='w-[150px] h-[50px] bg-[#ffba42] rounded-[15px] flex items-center justify-center' to={'/'}>Go Home</Link>
      </>
    )
  }else{
    return(
      <>
          <section className='w-full flex items-center justify-between'>

            <div className='flex items-center justify-center w-[30%] h-[full]'>
              <p className='flex items-center justify-center w-full h-full text-justify'>
                {data.description}
              </p>
            </div>


            <div className='flex flex-col items-end gap-y-[20px] w-[60%] h-full'>

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
                <iframe src={data.address} frameborder="0" className='rounded-[15px] ml-auto'></iframe>
              </div>


            </div>


          </section>
          
      </>
  )
  }

    
}