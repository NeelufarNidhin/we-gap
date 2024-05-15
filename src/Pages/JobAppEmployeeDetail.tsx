import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetJobApplicationByIdQuery } from '../API/jobApplicationApi';
import { useGetJobByIdQuery } from '../API/jobApi';
import { useGetEmployerByIdQuery } from '../API/employerApi';



function JobAppEmployeeDetail() {
    const { jobAppId ,jobId,employer } = useParams();
    const navigate = useNavigate();
  const { data: jobAppData, isLoading: jobAppLoading, isSuccess: jobAppSuccess, error: jobAppError } = useGetJobApplicationByIdQuery(jobAppId);
  const { data: jobData, isLoading: jobLoading, isSuccess: jobSuccess, error: jobError } = useGetJobByIdQuery(jobId);
  const { data: employerData, isLoading: employerLoading, isSuccess: employerSuccess, error: employerError } = useGetEmployerByIdQuery(employer);
  const formatDateTime = (timestamp :string) => {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleString(undefined, {
         year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
  return (
    (!jobAppLoading && jobAppData && !employerLoading && employerData) && (
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
                  <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{employerData.companyName}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{employerData.description}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Applied Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{formatDateTime(jobAppData.result.appliedDate)}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{employerData.location}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{employerData.website}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{jobAppData.result.jobStatus}</dd>
                </div>
               
                
               
              </dl>
            </div>
            
          </div>
          <button  className="px-4 py-2 mt-8 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => navigate(-1)}>Back</button>
        </div>
         ))
  
}

export default JobAppEmployeeDetail
