import React, { useEffect, useState } from 'react'
import employerModel from '../Interfaces/employerModel';


function GetEmployers() {
    const [employers,setEmployers] = useState<employerModel[]>([]);

    useEffect(()=>{
        fetch("http://localhost:8000/api/employer")
        .then((response) => response.json())
        .then((data : employerModel)=> {
            console.log(data);
           setEmployers([data])
        })
    },[])

  return (
    <div>
      
    </div>
  )
}

export default GetEmployers
