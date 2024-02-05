import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import apiResponse from '../Interfaces/apiResponse';
import ToastNotify from '../Helper/ToastNotify';
import axios from 'axios';
import { useCreateJobMutation } from '../API/jobApi';
import JobList from './JobList';
import JobCard from './JobCard';


function JobForm() {
const initialValues = {
   
    jobTitle : "",
    description:"",
    employerId:"",
    experience:"",
    salary:"",
    jobSkill:[] as string[],
    jobTypeId:""
}
const {id } = useParams()
const [values ,setValues] = useState(initialValues);
const navigate = useNavigate();
const [ createJob] = useCreateJobMutation();
const [jobSkills, setJobSkills] = useState([]);

const [selectedJobType,setSelectedJobType] = useState("")
const [jobTypeOptions, setJobTypeOptions] = useState([]);


 


useEffect(() => {
	// Fetch job skills data from the API when the component mounts
	
	fetchJobSkills();
	fetchJobType();
}, []);

const fetchJobSkills = async () => {
	try {
		const response = await axios.get('http://localhost:8000/api/jobSkill'); // Replace '/api/jobSkills' with your actual API endpoint
		setJobSkills(response.data);
		console.log(response.data)

	} catch (error) {
		console.error('Error fetching job skills:', error);
	}
};
const fetchJobType = async () => {
	try {
		const response = await axios.get('http://localhost:8000/api/jobType'); // Replace '/api/jobSkills' with your actual API endpoint
		setJobTypeOptions(response.data);
		console.log(response.data)
//
	} catch (error) {
		console.error('Error fetching job type:', error);
	}
};

const handleJobSkillChange = (event:any) => {
	const { value } = event.target;
	const isChecked = event.target.checked;
	if (isChecked) {
		setValues((prevValue:any) => ({ ...prevValue, jobSkill: [...prevValue.jobSkill, value] }));
	} else {
		setValues((prevValue:any) => ({
			...prevValue,
			jobSkill: prevValue.jobSkill.filter((skill:any) => skill !== parseInt(value))
		}));
	}
};
const handleInputChange = (e : any) => {
    const {name , value} = e.target;
    setValues ({
        ...values,
        [name] : value
    })
}

const handleJobTypeChange = (event:any) => {
    setSelectedJobType(event.target.value); // Update selected JobType Id in state
  };

const handleSubmit = async (e: any) => {
	try{
    e.preventDefault();
	console.log(id)
	console.log(values)
	const response: apiResponse = await axios.post('http://localhost:8000/api/job',{
		jobTitle : values.jobTitle,
    description:values.description,
    employerId:id,
    experience:values.experience,
    salary:values.salary,
    jobSkill:values.jobSkill,
    jobTypeId:selectedJobType
	
	})
	console.log(response.data);
	setValues(
	initialValues	

	)
	
	ToastNotify("Job Added");
}catch (error){
	console.error('Error creating job:', error);
}
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
				<h3>Job Skills</h3>
                {jobSkills.map((skill:any) => (
                    <div key={skill.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={skill.id}
                                onChange={handleJobSkillChange}
                                checked={values.jobSkill.includes(skill.id)}
                            />
                            {skill.skillName}
                        </label>
                    </div>
                ))}
				</div>
                <div className="col-span-full">
				<label htmlFor="jobTypeId">Job Type:</label>
      <select id="jobTypeId" value={selectedJobType} onChange={ handleJobTypeChange}>
        <option value="">Select Job Type...</option>
        {jobTypeOptions.map((jobtype:any) => (
          <option key={jobtype.id} value={jobtype.id}>{jobtype.jobTypeName}</option>
        ))}
      </select>
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
