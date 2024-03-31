import React, { useEffect } from 'react'
import layout1 from "../Assets/Images/Layout1.png";
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/Redux/store';
import { useGetEmployeeExistsQuery } from '../API/employeeApi';
import { useGetUserByIdQuery } from '../API/userApi';



function Employee() {
	
    const navigate = useNavigate()
	const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	  );
	
	console.log(userData)
	
	
	const {data,isLoading,isSuccess,isError} = useGetEmployeeExistsQuery(userData.id)

	//const {data : usrData , isLoading : userDataLoading} = useGetUserByIdQuery(userData.id)

	useEffect(() =>{
		// if(!userDataLoading && usrData ){
		// 	console.log(usrData)
		// 	if(usrData.isBlocked){
		// 		navigate ('/userblock')
		// 	}		
			
		// }
	},[])
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
	if(!isLoading &&  !isError ){
		console.log(data.result)
		navigate(`/EmployeeProfile/${data.result.id}`)
	}else if(!data){
		navigate('/EmployeeForm')
	}	
	}
       

  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
	<div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
		<img src={layout1} alt="" className="w-full h-60 sm:h-96 bg-gray-500" />
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
			<div className="space-y-2">
				<a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">Create a Profile and start searching Jobs</a>
				<p className="text-xs text-gray-600">
					<a rel="noopener noreferrer" href="#" className="text-xs hover:underline"></a>
				</p>
			</div>
			<div className="text-gray-800">
				
            <button type="button" onClick={handleSubmit} className="px-8 py-3 font-semibold rounded-full bg-gray-800 text-gray-100">Add Personal Info</button>
			</div>
		</div>
	</div>
</div>
  )
}

export default Employee
