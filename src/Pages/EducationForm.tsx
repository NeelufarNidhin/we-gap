import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAddEducationMutation } from '../API/educationApi';
import apiResponse from '../Interfaces/apiResponse';
import ToastNotify from '../Helper/ToastNotify';


function EducationForm() {
    const initialValues = {
        id:"",
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
    const navigate = useNavigate();
	const [addEducation] = useAddEducationMutation();
    const handleInputChange = (e :  React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setValues ({
            ...values,
            [name] : value
        })
    }
    
    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

		const response: apiResponse = await addEducation({
			
			degree:values.degree,
			subject:values.subject,
			university:values.university,
			percentage:values.percentage,
			starting_Date:values.starting_Date,
			completionDate:values.completionDate,
			employeeId:id
		});

		console.log(response.data);

		setValues({
			id:"",
			degree: "",
			subject: "",
			university: "",
			percentage:"",
			starting_Date: "",
			completionDate: "",
			employeeId: ""
		});
		ToastNotify("Education Added");
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
					<input id="degree" type="text" placeholder=""  value={values.degree}name='degree' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="subject" className="text-sm">Subject</label>
					<input id="subject" type="text" placeholder="subject"  value={values.subject} name='subject' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
				<div className="col-span-full">
					<label htmlFor="university" className="text-sm">University</label>
					<input id="university" type="text" placeholder=""  value={values.university} name='university' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="percentage" className="text-sm">Percentage</label>
					<input id="percentage" type="text" placeholder=""  value={values.percentage} name='percentage' onChange={handleInputChange}
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

export default EducationForm
