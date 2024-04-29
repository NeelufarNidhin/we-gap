import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useDeleteJobApplicationMutation, useGetJobApplicationQuery, useUpdateJobApplicationMutation } from '../API/jobApplicationApi';
import { Link } from 'react-router-dom';
import userModel from '../Interfaces/userModel';
import { useGetEmployerExistsQuery } from '../API/employerApi';




function JobApplicationList() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data: employerData, isLoading: employerLoading, isError: employerError } = useGetEmployerExistsQuery(userData.id);
  const { data, isLoading, isError, error } = useGetJobApplicationQuery([]);
 const [jobDetails,setJobDetails] = useState([]);
  const [updateJobApplication] = useUpdateJobApplicationMutation()
  const [deleteJobApplication] = useDeleteJobApplicationMutation();
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, jobAppId: string) => {
    const newStatus = e.target.value;
   // setSelectedStatus(newStatus);
   try {
    await updateJobApplication({ id: jobAppId, jobStatus: newStatus });
    // Update the job application status in the local state
    setJobDetails((prevDetails : any) => {
      const updatedDetails = prevDetails.map((jobApp: any) =>
        jobApp.id === jobAppId ? { ...jobApp, jobStatus: newStatus } : jobApp
      );
      return updatedDetails;
    });
  } catch (error) {
    console.error('Error updating job application status:', error);
  }
  };

  // const handleUpdate = (jobAppId: string) => {
  //   updateJobApplication({ id: jobAppId,
      
  //     jobStatus: selectedStatus });
    
  // };


  const handleDelete = (jobId: string) => {
    // Call the deleteJobApplication mutation
    deleteJobApplication(jobId);
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
            <th  className="py-2 px-6 bg-gray-200 border-b"></th>
            <th  className="py-2 px-6 bg-gray-200 border-b"></th>
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
                        value={jobApp.jobStatus}
                        onChange={(e) => handleStatusChange(e, jobApp.id)}
                        className="bg-white border rounded-md px-3 py-1"
                      >
                         <option value="applied">Applied</option>
                        <option value="pending">Pending</option>
                        <option value="shorlisted">ShortListed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
          <td className="py-2 px-6 border-b">
              <Link to={`/job-application/${jobApp.id}/${jobApp.employeeId}/${jobApp.jobId}`}>
                    <button className="bg-blue-500 text-white p-2 rounded-md mr-2">View</button>
                  </Link>
           
          
          </td>
          <td> <button  className="bg-orange-500 text-white p-2 rounded-md">Update </button></td>
          <td>  <button onClick={() => handleDelete(jobApp.id)} className="bg-red-500 text-white p-2 rounded-md">Delete</button></td>
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