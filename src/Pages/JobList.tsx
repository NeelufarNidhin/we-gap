import React, { useEffect, useState } from 'react'
import { useGetJobsQuery } from '../API/jobApi'
import { useNavigate } from 'react-router-dom';
import jobModel from '../Interfaces/jobModel';

function JobList() {
  const navigate = useNavigate()
  const [jobTypeName, setJobTypeName] = useState('');
  const [jobSkillNames, setJobSkillNames] = useState([]);

  

    const {data , isLoading,isSuccess,isError,error } = useGetJobsQuery({});
   

    let content = null;
    if (isLoading) {
      content = <p>Loading...</p>;
    } else if (isSuccess) {
      content = data.map((job:any) => (
        <div>
          
       
        <article key={job.id} className="my-8 mx-auto max-w-lg">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
              <p className="text-gray-600 mt-2">{job.description}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-200 p-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{job.employer.companyName}</h4>
                <p className="text-gray-600">{job.employer.location}</p>
              </div>
            </div>
          </div>
        </article>
        </div>
      ));
    }
  
    return (
      <div className="container mx-auto">
        <div> <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>{" "}
          Back
        </button></div>
        {content}
       
      </div>
    );
  }
  
export default JobList;