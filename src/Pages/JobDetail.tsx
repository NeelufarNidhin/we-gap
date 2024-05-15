import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../API/jobApi";
import { useCreateJobApplicationMutation } from "../API/jobApplicationApi";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { useGetEmployeeExistsQuery } from "../API/employeeApi";

function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  // Fetch job details
  const { data: jobData, isLoading: jobLoading, isSuccess: jobSuccess, error: jobError } = useGetJobByIdQuery(jobId);
  
  // State for job application details
  const [availability, setAvailability] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [buttonText, setButtonText] = useState('Apply Now');
  const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	  );
  const {data :employeeData,isLoading :EmployeeLoading,isError :EmployeeError} = useGetEmployeeExistsQuery(userData.id)
  // Mutation for creating job application
  const [createJobApplication] = useCreateJobApplicationMutation();
  const formatDateTime = (timestamp :string) => {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleString(undefined, {
         year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
  useEffect(() => {
   // const isJobApplied = localStorage.getItem(`job_${jobId}_applied`);
    // if (isJobApplied) {
    //   setButtonText('Applied');
    // }

    if(!jobLoading && jobData){
      jobData.result.status && setButtonText('Applied') 
    }
  }, [jobData]);
  // Function to handle submit button click
  const handleSubmit = async (e :any) => {
    e.preventDefault();
   
      const formData = new FormData();
      if (typeof jobId === 'string') {
        formData.append("JobId", jobId);
      }
      if(!EmployeeLoading && employeeData ){
        formData.append("EmployeeId", employeeData.result.id); 
      }
     
    formData.append("Jobtitle", jobData.result.jobTitle);
    formData.append("JobStatus", "Applied")
    formData.append("Employer", jobData.result.employerId);
      formData.append("Availability", availability);
      formData.append("CoverLetter", coverLetter);
      if (resume !== null) {
        formData.append("Resume", resume);
      }
      
     const response : any = await createJobApplication(formData);
      
      // Redirect to confirmation page or any other page
      if(response.data){
        navigate('/confirmation');
        setButtonText('Applied'); // Change button text after applying
       // localStorage.setItem(`job_${jobId}_applied`, 'true');
      }
     
    
  };
  
  if (jobLoading) return <div>Loading...</div>;
  if (!jobSuccess || !jobData.result) return <div>Error loading job details</div>;
  
  const { jobTitle, description, experience, salary, createdAt, jobTypeId, jobSkill, employer } = jobData.result;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setResume(file);
    }
  };
  
  return (
    <div>
       <div className="container mx-auto mt-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md p-4">
            <div className=" text-gray-800"></div>
            <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
            <p className="text-xl bg-gray-200 font-bold mb-2">Job Title: {jobTitle}</p>
      <p className="mb-2">Description: {description}</p>
      <p className="mb-2">Experience: {experience}</p>
      <p className="mb-2">Salary: {salary}</p>
      <p className="mb-4">Posted Date: {formatDateTime(createdAt)}</p>
      {/* Render other job details */}
      
      <h2 className="text-2xl font-semibold mb-4">Apply for Job</h2>
      <form onSubmit={handleSubmit}  method="post" className="mb-4"
          encType="multipart/form-data"
         >
            <div className="mb-4">
            <label className="block mb-1">
        Availability:
        <input className="border border-gray-300 rounded-md px-3 py-2 w-full" required type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
        
      </label>
            </div>
            <div className="mb-4"> 
            <label className="block mb-1">
        Cover Letter:
        <textarea className="border border-gray-300 rounded-md px-3 py-2 w-full" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
      </label>  </div>
      <div className="mb-4">
      <label className="block mb-1">
        Resume:
        <input className="border border-gray-300 rounded-md px-3 py-2 w-full" type="file" onChange={handleFileChange} />
      </label> </div>
      
      <button type="submit" className="border border-black rounded-md px-3 py-2 mx-2 bg-violet-300" disabled={ buttonText === 'Applied'} >  {buttonText}</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default JobDetail;
