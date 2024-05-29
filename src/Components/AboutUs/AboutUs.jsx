import { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database'
import { database } from '../../Firebase/firebase.mjs'

export default function AboutUs(){
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        get(ref(database, 'aboutUs')).then(
            response => {
                if(response.exists()){
                    setData(response.val().name)
                }
            }
        )
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


    return(
        <>
            <h1>
                {data}
            </h1>
        </>
    )
}