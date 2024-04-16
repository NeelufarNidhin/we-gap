import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAddEducationMutation, useGetEducationByIdQuery, useUpdateEducationMutation } from '../API/educationApi';
import apiResponse from '../Interfaces/apiResponse';
import ToastNotify from '../Helper/ToastNotify';
import inputHelper from '../Helper/inputHelper';


function EducationForm(eduId:any) {
    const initialValues = {
       
    degree:"",
    subject:"",
    university:"",
    percentage:"",
    starting_Date:"",
    completionDate:"",
    employeeId:""
    }
	const {id} = useParams();
	
    const [values ,setValues] = useState(initialValues);

	const {educationId} = useParams();
	const {data,isLoading,error,isSuccess} = useGetEducationByIdQuery(educationId);


	// useEffect(() =>{
		
	// 	if(!isLoading && data && data.result){
	// 		console.log(data.result);
	// 		const tempData = {
				
	// 		degree : data.result.degree,
	// 		subject : data.result.subject ,
	// 		university : data.result.university,
	// 		percentage : data.result.percentage,
	// 		starting_Date : data.result.starting_Date,
	// 		completionDate : data.result.completionDate,
	// 		employeeId : data.result.employeeId
	// 		};
	// 		setValues(tempData);
	// 	}
	// },[data,isLoading])
	useEffect(() => {
		if (!isLoading && data && data.result) {
			const { starting_Date, completionDate, ...otherData } = data.result;
			
			const formattedData = {
				...otherData,
				starting_Date: starting_Date ? starting_Date.split('T')[0] : '', // Extract YYYY-MM-DD part
				completionDate: completionDate ? completionDate.split('T')[0] : '' // Extract YYYY-MM-DD part
			};
			
			setValues(formattedData);
			
			console.log("Updated Values:", values); // Check the updated state values
		}
	}, [data, isLoading]);
    const navigate = useNavigate();
	const [addEducation] = useAddEducationMutation();
	const [updateEducation] = useUpdateEducationMutation();

    const handleInputChange = (e :  React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e,values);
     setValues(tempData);
    }
    
    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

		let response: apiResponse ;
		if(educationId){
			response = await updateEducation({ 
				id :educationId,
				degree : values.degree,
			subject : values.subject ,
			university : values.university,
			percentage : values.percentage,
			starting_Date : values.starting_Date,
			completionDate : values.completionDate,
			employeeId : values.employeeId
			})
		}
		else{
		response = await addEducation({
			
			degree:values.degree,
			subject:values.subject,
			university:values.university,
			percentage:values.percentage,
			starting_Date:values.starting_Date,
			completionDate:values.completionDate,
			employeeId:id
		});
		}
		if (response.data && response.data.isSuccess){
			console.log(response.data.result);
	  

		setValues({
			
			degree: "",
			subject: "",
			university: "",
			percentage:"",
			starting_Date: "",
			completionDate: "",
			employeeId: ""
		});
		//ToastNotify("Education Added");
	}
	else if (response.error || !response.data?.isSuccess) {
		console.log(response.error)
		ToastNotify(response.error?.data?.errorMessages[0],"error");
	   }
    }
  return (
    <div>
      <section className="p-6 bg-violet-300 text-gray-900">
	<form method="post" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add Education</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="degree" className="text-sm">Degree </label>
					<input id="degree" type="text" placeholder="" required value={values.degree} name="degree" onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="subject" className="text-sm">Subject</label>
					<input id="subject" type="text" placeholder="subject"  required value={values.subject} name='subject' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
				<div className="col-span-full">
					<label htmlFor="university" className="text-sm">University</label>
					<input id="university" type="text" placeholder="" required value={values.university} name='university' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="percentage" className="text-sm">Percentage</label>
					<input id="percentage" type="text" placeholder=""   value={values.percentage} name='percentage' onChange={handleInputChange}
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
		<div className="flex justify-between">
              <button
                type="submit"
                className="w-full px-8 py-3 mx-4   font-semibold rounded-md bg-violet-400 text-white"
              >
               Submit
              </button>
			  <button
              onClick={() => navigate(-1)}
              className="w-full px-8 py-3  mx-4 font-semibold rounded-md bg-violet-400 text-white"
            >
              Back
            </button>
            </div>
	</form>
</section>
    </div>
  )
}

export default EducationForm
