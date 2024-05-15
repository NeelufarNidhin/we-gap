import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useDeleteJobApplicationMutation, useGetEmployerJobApplicationQuery, useGetJobApplicationQuery, useUpdateJobApplicationMutation } from '../API/jobApplicationApi';
import { Link } from 'react-router-dom';
import userModel from '../Interfaces/userModel';
import { useGetEmployerExistsQuery } from '../API/employerApi';




function JobApplicationList() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data: employerData, isLoading: employerLoading, isError: employerError } = useGetEmployerExistsQuery(userData.id);

  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const { data: jobApplicationData, isLoading, isError } = useGetEmployerJobApplicationQuery({employerId: employerData?.id,pageNumber : pageOptions.pageNumber,
    pageSize : pageOptions.pageSize});
  
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

  

  const handleDelete = (jobId: string) => {
    // Call the deleteJobApplication mutation
    deleteJobApplication(jobId);
  };
  
  useEffect(() => {
    if (jobApplicationData && jobApplicationData.totalRecords) {
      const { TotalRecords } = JSON.parse(jobApplicationData.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [jobApplicationData]);
  const getPageDetails = () =>{
    const dataStartNumber = (pageOptions.pageNumber  - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber  * pageOptions.pageSize;

    return `${dataStartNumber}
            -
            ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords}
             of ${totalRecords}`;
  };

  const handlePaginationClick = (direction : string, pageSize?: number) =>{
    if(direction === "prev"){
      setPageOptions({pageSize: 5 , pageNumber: pageOptions.pageNumber - 1});
    } else if (direction === "next" ){
      setPageOptions({pageSize:5 , pageNumber: pageOptions.pageNumber + 1});
    }else if(direction === "change"){
      setPageOptions({
        pageSize: pageSize? pageSize : 5,
        pageNumber : 1
      })
    }
  }
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
        {jobApplicationData &&
  jobApplicationData.apiResponse.result.map((jobApp: any) => {
    // Check if the employerId of the job application matches employerData.Id
   
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
   
  })}
        </tbody>
      </table>
      {/* Pagination */}
     <div className="flex items-center justify-end mt-4">
          <div>Rows per page</div>
          <div>
            <select className="mx-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>{
              handlePaginationClick("change", Number(e.target.value));
              setCurrentPageSize(Number(e.target.value))
            }} value={currentPageSize}> 
            <option>5</option>
            <option>10</option>
            <option>15</option>
            </select>
          </div>
          <div className="mx-2">{getPageDetails()}</div>
          <button
            className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            disabled={pageOptions.pageNumber === 1}
            onClick={() => handlePaginationClick("prev") }
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
            onClick={() =>  handlePaginationClick("next") }
          >
            Next
          </button>
          </div>
       
    </div>
  );
}

export default JobApplicationList;