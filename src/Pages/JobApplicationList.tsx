import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useGetJobApplicationQuery, useUpdateJobApplicationMutation } from '../API/jobApplicationApi';
import { Link } from 'react-router-dom';
import userModel from '../Interfaces/userModel';
import { useGetEmployerExistsQuery } from '../API/employerApi';
import { useGetJobByIdQuery } from '../API/jobApi';

// interface JobDetails {
//   [jobId: string]: {
//     title: string;
//     companyName: string;
//     jobTypeName: string;
//   };
// }

function JobApplicationList() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data: employerData, isLoading: employerLoading, isError: employerError } = useGetEmployerExistsQuery(userData.id);
  const { data, isLoading, isError, error } = useGetJobApplicationQuery({});
  const [jobDetails, setJobDetails] = useState([]);
  const [updateJobApplication] = useUpdateJobApplicationMutation()

  const [selectedStatus, setSelectedStatus] = useState('');
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, jobId: string) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    // Call an API to update the status of the job application
    updateJobApplication({id:jobId,jobStatus: newStatus});
  };

  if (isLoading || employerLoading ) {
    return <div>Loading...</div>;
  }

  if (isError || employerError ) {
    return <div>Error: </div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
     
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="py-2 px-6 bg-gray-200 border-b">Job Title</th>
            <th className="py-2 px-6 bg-gray-200 border-b">EmployeeId</th>
            {/* <th className="py-2 px-6 bg-gray-200 border-b">Job Type</th> */}
            <th className="py-2 px-6 bg-gray-200 border-b">Status</th>
            <th className="py-2 px-6 bg-gray-200 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
        {data &&
  data.result.map((jobApp: any) => {
    // Check if the employerId of the job application matches employerData.Id
    if (jobApp.employer === employerData.id) {
      return (
        <tr key={jobApp.id}>
          <td className="py-2 px-6 border-b">{jobApp.jobtitle}</td>
          <td className="py-2 px-6 border-b">{jobApp.employeeId}</td>
          <td className="py-2 px-6 border-b">
                      <select
                        value={selectedStatus}
                        onChange={(e) => handleStatusChange(e, jobApp.id)}
                        className="bg-white border rounded-md px-3 py-1"
                      >
                         <option value="applied">Applied</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
          <td className="py-2 px-6 border-b">
              <Link to={`/job-application/${jobApp.id}`}>
                    <button className="bg-blue-500 text-white p-2 rounded-md mr-2">View</button>
                  </Link>
            <button className="bg-orange-500 text-white p-2 rounded-md">Update Status</button>
          </td>
        </tr>
      );
    } else {
      return null; // If employerId doesn't match, don't render this job application
    }
  })}
        </tbody>
      </table>
    </div>
  );
}

export default JobApplicationList;