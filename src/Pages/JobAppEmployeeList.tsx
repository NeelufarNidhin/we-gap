import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../Storage/Redux/store';
import { useGetEmployeeExistsQuery } from '../API/employeeApi';
import { useGetEmployeeJobApplicationQuery } from '../API/jobApplicationApi';
import userModel from '../Interfaces/userModel';

function JobAppEmployeeList() {
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const { data: employeeData, isLoading: employeeLoading, isError: employeeError } = useGetEmployeeExistsQuery(userData.id);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  
  const { data: jobApplicationData, isLoading, isError } = useGetEmployeeJobApplicationQuery({
    employeeId: employeeData?.result.id,
    pageNumber: pageOptions.pageNumber,
    pageSize: pageOptions.pageSize,
  });

  useEffect(() => {
    if (jobApplicationData && jobApplicationData.totalRecords) {
      const { TotalRecords } = JSON.parse(jobApplicationData.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [jobApplicationData]);

  const getPageDetails = () => {
    const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`;
  };

  const handlePaginationClick = (direction: string, pageSize?: number) => {
    if (direction === 'prev') {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === 'next') {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === 'change') {
      setPageOptions({
        pageSize: pageSize || 5,
        pageNumber: 1,
      });
    }
  };

  if (isLoading || employeeLoading) {
    return <div>Loading...</div>;
  }

  if (isError || employeeError) {
    return <div>Error:</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="py-2 px-6 bg-gray-200 border-b">Job Title</th>
            <th className="py-2 px-6 bg-gray-200 border-b">EmployerId</th>
            <th className="py-2 px-6 bg-gray-200 border-b">Status</th>
            <th className="py-2 px-6 bg-gray-200 border-b">Actions</th>
            {/* <th className="py-2 px-6 bg-gray-200 border-b"></th> */}
          </tr>
        </thead>
        <tbody>
          {jobApplicationData &&
            jobApplicationData.apiResponse.result.map((jobApp: any) => (
              <tr key={jobApp.id}>
                <td className="py-2 px-6 border-b">{jobApp.jobtitle}</td>
                <td className="py-2 px-6 border-b">{jobApp.employer}</td>
                <td className="py-2 px-6 border-b">{jobApp.jobStatus}</td>
                <td className="py-2 px-6 border-b">
                  <Link to={`/jobEmpApplication/${jobApp.id}/${jobApp.employer}/${jobApp.jobId}`}>
                    <button className="bg-blue-500 text-white p-2 rounded-md mr-2">View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <div>Rows per page</div>
        <div>
          <select
            className="mx-2"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handlePaginationClick('change', Number(e.target.value));
              setCurrentPageSize(Number(e.target.value));
            }}
            value={currentPageSize}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>
        <div className="mx-2">{getPageDetails()}</div>
        <button
          className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          disabled={pageOptions.pageNumber === 1}
          onClick={() => handlePaginationClick('prev')}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
          onClick={() => handlePaginationClick('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobAppEmployeeList;
