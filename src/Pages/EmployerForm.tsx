import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/Redux/store';
import { useCreateEmployerMutation, useGetEmployerByIdQuery, useUpdateEmployerMutation } from '../API/employerApi';
import apiResponse from '../Interfaces/apiResponse';

import inputHelper from '../Helper/inputHelper';

function EmployerForm(emplyerId : any) {
    const initialValues = {
		companyName : "",
		location : "",
		description : "",
		website: "",
		
	
	}
	const [values ,setValues] = useState(initialValues);

	const navigate = useNavigate();
	const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	  );

	  const {id}= useParams();
	const [createEmployer] = useCreateEmployerMutation();
	const [ updateEmployer]= useUpdateEmployerMutation();
	const {employerId} = useParams();
	const {data,isLoading } = useGetEmployerByIdQuery(employerId);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>  | React.ChangeEvent<HTMLSelectElement>) => {
		const tempData = inputHelper(e,values);
		setValues(tempData);
	   
	  };

	useEffect(() =>{
		if(!isLoading && data){
			console.log(data)
			const tempData = {
				companyName : data.companyName,
				location : data.location,
				description : data.description,
				website: data.website,
			}
			setValues(tempData)
		}
	},[data,isLoading])

	

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		let response: apiResponse;
		if(employerId){
			response = await updateEmployer({
				id: employerId,
				applicationUserId : userData.id,
		  companyName : values.companyName,
		  location : values.location,
		  description : values.description,
		  website : values.website
			})
		}
		else{
			response= await createEmployer({
				applicationUserId : userData.id,
				companyName : values.companyName,
				location : values.location,
				description : values.description,
				website : values.website
				
			  });
		}
		
		console.log(response.data);
		if (response.data) {
		// ToastNotify("User Registration done , Please sign in to continue");
		setValues(initialValues)
		  navigate(-1);
	}}

  return (
    <div>
         <section className="p-6 bg-violet-300 text-gray-900">
	<form method="post" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Company Profile</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="companyName" className="text-sm">Company Name </label>
					<input id="companyName" type="text" placeholder="Company name"  value={values.companyName} name='companyName' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="location" className="text-sm">Location</label>
					<input id="location" type="text" placeholder="Location"  value={values.location} name='location' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
				<div className="col-span-full">
					<label htmlFor="description" className="text-sm">Description</label>
					<input id="description" type="text" placeholder=""  value={values.description} name='description' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="website" className="text-sm">Website</label>
					<input id="website" type="text" placeholder=""  value={values.website} name='website' onChange={handleInputChange}
					className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
			</div>
		</fieldset>
		<div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
              >
               Submit
              </button>
			  <button
            onClick={() =>navigate(-1) }
              className="float-right w-100 px-8 py-3 font-semibold rounded-md bg-violet-500 text-white "
            >
              Back
            </button>

            </div>
	</form>
</section>
      
    </div>
  )
}

export default EmployerForm
