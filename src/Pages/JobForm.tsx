import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import apiResponse from '../Interfaces/apiResponse';
import ToastNotify from '../Helper/ToastNotify';

import { useCreateJobMutation, useGetJobByIdQuery, useUpdateJobMutation } from '../API/jobApi';

import { useGetJobSkillQuery } from '../API/jobskillApi';
import { useGetJobTypeQuery } from '../API/jobTypeApi';
import inputHelper from '../Helper/inputHelper';


function JobForm(jId:any) {
const initialValues = {
   
    jobTitle : "",
    description:"",
    employerId:"",
    experience:"",
    salary:"",
    jobSkill:[] as string[],
    jobTypeId:""
}
const {id } = useParams();
const [values ,setValues] = useState(initialValues);
const navigate = useNavigate();
const [ createJob] = useCreateJobMutation();
const [updateJob] =  useUpdateJobMutation();

const {jobId} = useParams();

const{data,isLoading} = useGetJobByIdQuery(jobId)

useEffect(() =>{
	if(!isLoading && data && data.result){
		console.log(data.result)
		const tempData = {
   
			jobTitle : data.result.jobTitle,
			description : data.result.description,
			employerId : data.result.employerId,
			experience : data.result.experience,
			salary : data.result.salary,
			jobSkill :values.jobSkill,
			jobTypeId:data.result.jobTypeId
		};
		setValues(tempData)
		setSelectedJobType(data.result.jobTypeId);
	}
},[data ,isLoading])

const [selectedJobType,setSelectedJobType] = useState("")




const{data:jobSkills,isLoading:jobSkillLoading ,
	} = useGetJobSkillQuery({})

	const{data:jobTypes,isLoading:jobTypeLoading ,
		} = useGetJobTypeQuery({})
		const handleJobSkillChange = (event:any) => {
			const { value } = event.target;
			const isChecked = event.target.checked;
			
			setValues((prevValue:any) => ({
				...prevValue,
				jobSkill: prevValue.jobSkill ? 
					(isChecked ? [...prevValue.jobSkill, value] : prevValue.jobSkill.filter((skill:any) => skill !== parseInt(value))) : 
					(isChecked ? [value] : [])
			}));
		};
// 

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const tempData = inputHelper(e, values);
    setValues(tempData);
  };

const handleJobTypeChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJobType(event.target.value); 
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	try{
    e.preventDefault();
	console.log(id)
	console.log(values)
	let response: apiResponse ;
	if(jobId){
		response = await updateJob({
			id : jobId,
			jobTitle : values.jobTitle,
			description:values.description,
			employerId:id,
			experience:values.experience,
			salary:values.salary,
			jobSkill:values.jobSkill,
			jobTypeId:selectedJobType
		})
	}
	response= await createJob({
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
					<input id="jobTitle" type="text" placeholder="Job Title" required  value={values.jobTitle}
                     name='jobTitle' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
                <label htmlFor="salary" className="text-sm">Salary</label>
                <select
    id="salary"
    value={values.salary}
    name="salary"
    onChange={handleInputChange}
    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
>
    <option value="">Select Salary...</option>
    <option value="Below 100000">Below 100000</option>
    <option value="100000-200000">100000-200000</option>
    <option value="200000-400000">200000-400000</option>
    <option value="400000-600000">400000-600000</option>
    <option value="600000-800000">600000-800000</option>
    <option value="800000-100000">800000-100000</option>
    <option value="Above 100000">Above 100000</option>
    
</select>
				</div>
				<div className="col-span-full">
    <h3>Job Skills</h3>
    {jobSkillLoading ? (
        <p>Loading job skills...</p>
    ) : jobSkills?.apiResponse.result ? (
        jobSkills.apiResponse.result.map((skill:any) => (
			
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
			
        ))
    ) : (
        <p>No job skills found.</p>
    )}
</div>
<div className="col-span-full">
    <label htmlFor="jobTypeId">Job Type:</label>
    <select id="jobTypeId" value={selectedJobType} required onChange={handleJobTypeChange}>
        <option value="">Select Job Type...</option>
        {jobTypeLoading ? (
            <option disabled>Loading job types...</option>
        ) : jobTypes?.apiResponse.result ?? [] ? (
            jobTypes?.apiResponse.result.map((jobtype : any) => (
                <option key={jobtype.id} value={jobtype.id}>
                    {jobtype.jobTypeName}
                </option>
            ))
        ) : (
            <option disabled>No job types found</option>
        )}
    </select>
</div>
				<div className="col-span-full">
					<label htmlFor="description" className="text-sm">Description</label>
					<textarea id="description" rows={4}  placeholder=""  value={values.description} name='description' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
                <label htmlFor="experience" className="text-sm">Experience</label>
					<select
    id="experience"
    value={values.experience}
    name="experience"
    onChange={handleInputChange}
    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
>
    <option value="">Select Experience...</option>
    <option value="0-1">0-1 years</option>
    <option value="1-2">1-2 years</option>
    <option value="2-3">2-3 years</option>
    <option value="3-4">3-4 years</option>
    <option value="4-5">4-5 years</option>
    <option value="5-6">5-6 years</option>
    <option value="6-7">6-7 years</option>
    <option value="8+">8+ years</option>
</select>
				</div>
				
			</div>
		</fieldset>
		<div className="flex justify-between">
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
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

export default JobForm
