import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import apiResponse from '../Interfaces/apiResponse';
import { useAddExperienceMutation } from '../API/experienceApi';
import employeeModel from '../Interfaces/employeeModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import ToastNotify from '../Helper/ToastNotify';
import axios from 'axios';

function ExperienceForm() {
    const initialValues = {
        id:"",
        currentJobTitle:"",
        isWorking:"",
        description:"",
        starting_Date:"",
        completionDate:"",
        companyName:"",
        employeeId:""
    }
    const [values ,setValues] = useState(initialValues);
   
    const navigate = useNavigate();
    const {id } = useParams()
	const [addExperience] = useAddExperienceMutation();
    // const employeeData: employeeModel = useSelector(
		// (state: RootState) => state.employeeAuthStore
	  // );
   

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setValues ({
            ...values,
            [name] : value
        })
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const response: apiResponse = await addExperience({
            
            currentJobTitle:values.currentJobTitle,
            isWorking:values.isWorking,
            description:values.description,
            starting_Date:values.starting_Date,
            completionDate:values.completionDate,
            companyName:values.companyName,
            employeeId:id
		  
		});
		console.log(response.data);

    setValues({
      id: "",
      currentJobTitle: "",
      isWorking: "",
      description: "",
      starting_Date: "",
      completionDate: "",
      companyName: "",
      employeeId: ""
  });
	// 	if (response.data) {
	 //ToastNotify("Experience Added");
	// 	  navigate(`/EmployerProfile/${response.data.id}`);
	// }
}
  return (
    <div>
      <section className="p-6 bg-violet-300 text-gray-900">
	<form method="post" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add Experience</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="currentJobTitle" className="text-sm">Current Job Title </label>
					<input id="currentJobTitle" type="text" placeholder="Title" required  value={values.currentJobTitle} name='currentJobTitle' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				{/* <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"> */}
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="companyName" className="text-sm">Company Name </label>
					<input id="companyName" type="text" placeholder="Company name"  required value={values.companyName} name='companyName' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
        <div className="col-span-full sm:col-span-3">
					<label htmlFor="isWorking" className="text-sm">Current Work Status </label>
					<input id="isWorking" type="text" placeholder="Status"  required value={values.isWorking} name='isWorking' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				{/* </div> */}
				<div className="col-span-full">
					<label htmlFor="description" className="text-sm">Description</label>
					<input id="description" type="text" placeholder=""  value={values.description} name='description' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
                <div className="col-span-full sm:col-span-2">
					<label htmlFor="starting_Date" className="text-sm">Start Date</label>
					<input id="starting_Date" type="date" placeholder=""  value={values.starting_Date} name='starting_Date' onChange={handleInputChange}
					className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-2">
					<label htmlFor="completionDate" className="text-sm">Completion Date</label>
					<input id="completionDate" type="date" placeholder=""  value={values.completionDate} name='completionDate' onChange={handleInputChange}
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
            </div>
	</form>
</section>

    </div>
  )
}

export default ExperienceForm
