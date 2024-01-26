import React from 'react'
import employerModel from '../Interfaces/employerModel'

interface Props {
    employerItem : employerModel
}

function EmployerCard(props : Props) {
  return (
    <div>
     <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
  <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
     <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt=""/>
     <div className="text-center mt-2 text-3xl font-medium">{props.employerItem.companyName}</div>
     <div className="text-center mt-2 font-light text-sm">{props.employerItem.location}</div>
     <div className="text-center font-normal text-lg">{props.employerItem.website}</div>
     <div className="px-6 text-center mt-2 font-light text-sm">
       <p>
        {props.employerItem.description}
       </p>
     </div>
     <hr className="mt-8"/>
     <div className="flex p-4">
       {/* <div className="w-1/2 text-center">
         <span className="font-bold">1.8 k</span> Followers
       </div>
       <div className="w-0 border border-gray-300">
         
       </div>
       <div className="w-1/2 text-center">
         <span className="font-bold">2.0 k</span> Following
       </div> */}
     </div>
  </div>
</div>

    </div>
  )
}

export default EmployerCard
