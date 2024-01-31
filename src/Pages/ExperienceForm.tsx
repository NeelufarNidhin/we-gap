import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

    const handleInputChange = (e : any) => {
        const {name , value} = e.target;
        setValues ({
            ...values,
            [name] : value
        })
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
					<label htmlFor="companyName" className="text-sm">Company Name </label>
					<input id="companyName" type="text" placeholder="Company name"  value={values.companyName} name='companyName' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
				
				<div className="col-span-full">
					<label htmlFor="description" className="text-sm">Description</label>
					<input id="description" type="text" placeholder=""  value={values.description} name='description' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
                <div className="col-span-full sm:col-span-2">
					<label htmlFor="starting_Date" className="text-sm">Start Date</label>
					<input id="starting_Date" type="text" placeholder=""  value={values.starting_Date} name='starting_Date' onChange={handleInputChange}
					className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-2">
					<label htmlFor="completionDate" className="text-sm">Completion Date</label>
					<input id="completionDate" type="text" placeholder=""  value={values.completionDate} name='completionDate' onChange={handleInputChange}
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
