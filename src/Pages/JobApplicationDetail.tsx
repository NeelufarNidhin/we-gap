import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery } from '../API/jobApi';
import { useGetJobApplicationByIdQuery } from '../API/jobApplicationApi';
import { useGetEmployeeByIdQuery } from '../API/employeeApi';


interface JobApplicationDetails {
  jobId: string;
  employeeId: string;
 
}
function JobApplicationDetail() {
  const { jobAppId ,jobId,employeeId } = useParams();
  const [jobAppDetails, setJobAppDetails] = useState<JobApplicationDetails>({ jobId: '', employeeId: '' });
 
  const [jobDetails, setJobDetails] = useState({});
  const [employeeDetails, setEmployeeDetails] = useState({});

 // const{data,isLoading,isSuccess,error} = useGetJobApplicationByIdQuery(id)

  const { data: jobAppData, isLoading: jobAppLoading, isSuccess: jobAppSuccess, error: jobAppError } = useGetJobApplicationByIdQuery(jobAppId);
  const { data: jobData, isLoading: jobLoading, isSuccess: jobSuccess, error: jobError } = useGetJobByIdQuery(jobId);
  const { data: employeeData, isLoading: employeeLoading, isSuccess: employeeSuccess, error: employeeError } = useGetEmployeeByIdQuery(employeeId);

  const formatDateTime = (timestamp :string) => {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleString(undefined, {
         year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
  return (
     (!jobAppLoading && jobAppData && !employeeLoading && employeeData) && (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Job Application Detail</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Job Application Details</h3> */}
          {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the job application</p> */}
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{jobAppData.result.jobtitle}</dd>
            </div>
           
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{employeeData.result.mobileNumber}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Applied Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{formatDateTime(jobAppData.result.appliedDate)}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Availability</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{jobAppData.result.availability}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{jobAppData.result.coverLetter}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{jobAppData.result.jobStatus}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Resume</dt>
              <a href={jobAppData.result.resumeFileName} target="_blank" rel="noopener noreferrer">View Resume</a>
            </div>
            
           
          </dl>
        </div>
      </div>
    </div>
     ))
}

export default JobApplicationDetail
