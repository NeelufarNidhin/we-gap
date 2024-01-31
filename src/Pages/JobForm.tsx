import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateJobTypeMutation } from '../API/jobTypeApi';

function JobForm() {
const initialValues = {
    id: "",
    jobTitle : "",
    description:"",
    employerId:"",
    experience:"",
    salary:"",
    jobSkills:"",
    jobTypes:""
}
const [values ,setValues] = useState(initialValues);
const navigate = useNavigate();
const [ createJob] = useCreateJobTypeMutation();

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
				<p className="font-medium">Post a Job </p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="jobTitle" className="text-sm">Job Title </label>
					<input id="jobTitle" type="text" placeholder="Job Title"  value={values.jobTitle}
                     name='jobTitle' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="salary" className="text-sm">Salary</label>
					<input id="salary" type="text" placeholder="salary"  value={values.salary} name='salary' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full">
					<label htmlFor="jobSkills" className="text-sm">Job Skill</label>
					<input id="jobSkills" type="text" placeholder=""  value={values.jobSkills} name='jobSkills' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full">
					<label htmlFor="jobType" className="text-sm">Job Type</label>
					<input id="jobType" type="text" placeholder=""  value={values.jobTypes} name='jobType' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full">
					<label htmlFor="description" className="text-sm">Description</label>
					<input id="description" type="text" placeholder=""  value={values.description} name='description' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="experience" className="text-sm">Experience</label>
					<input id="experience" type="text" placeholder="experience"  value={values.experience} name="experience" onChange={handleInputChange}
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

export default JobForm
