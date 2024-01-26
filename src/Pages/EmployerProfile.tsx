import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import employerModel from '../Interfaces/employerModel'

interface Props {
    employerItem?  : employerModel
}

function EmployerProfile(props:Props) {
    const [employers,setEmployers] = useState<employerModel>();
  const { id } = useParams();
   useEffect(()=>{
        fetch(`http://localhost:8000/api/employer/${id}`)
        .then((response) => response.json())
        .then((data : employerModel)=> {
            console.log(data);
           setEmployers(data)
        })
    },[])
    
  return (
    <div>
         <div className="h-full bg-gray-200 p-8">
      
            
            
            <div className="w-full h-[250px]">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg"/>
            </div>
            <div className="flex flex-col items-center -mt-20">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" className="w-40 border-4 border-white rounded-full"/>
                <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl">{employers?.companyName}</p>
                    <span className="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <p className="text-gray-700">{employers?.location}</p>
                <p className="text-sm text-gray-500">{employers?.website}</p>
                <p className="text-sm text-gray-500">{employers?.description}</p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <span>Connect</span>
                    </button>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                        </svg>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
      </div>

  )
}

export default EmployerProfile
