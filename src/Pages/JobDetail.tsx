import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery } from '../API/jobApi';

function JobDetail() {
  const { jobId } = useParams();
  const { data, isLoading, isSuccess, error } = useGetJobByIdQuery(jobId);
  //console.log(data.result)
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Something went wrong</p>;
  } else if (isSuccess && data.result) {
    const job = data.result;
    content = (
      <div className="container mx-auto mt-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
            <p className="text-gray-600 mt-2">{job.salary}</p>
            <p className='text-gray-600 mt-2'> {job.experience}</p>
          </div>
          <div className="flex justify-between items-center bg-gray-200 p-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{job.description}</h4>
              {/* <p className="text-gray-600">{job.employer.location}</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default JobDetail;
