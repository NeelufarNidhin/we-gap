import { Link, useNavigate } from 'react-router-dom';
import { useGetJobsQuery } from '../API/jobApi';
import { useEffect, useState } from 'react';
import { useGetJobSkillQuery } from '../API/jobskillApi';
import { useGetJobTypeQuery } from '../API/jobTypeApi';
import inputHelper from '../Helper/inputHelper';
import EmployeeJobCard from './EmployeeJobCard';

function JobList() {
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState([]);
  const { data: jobSkills, isLoading: jobSkillLoading } = useGetJobSkillQuery({});
  const { data: jobTypes, isLoading: jobTypeLoading } = useGetJobTypeQuery({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5
  });
  const [filters, setFilters] = useState({ searchString: "", jobType: "", jobSkill: "" });
  const [apiFilters, setApiFilters] = useState({ searchString: "", jobType: "", jobSkill: "" });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  
  const { data, isLoading, isSuccess, error } = useGetJobsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      jobType: apiFilters.jobType,
      jobSkill: apiFilters.jobSkill,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
      sortBy,
      sortOrder
    })
  });

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      jobType: filters.jobType,
      jobSkill: filters.jobSkill
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  useEffect(() => {
    if (data) {
      setJobs(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data?.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`;
  };

  const handlePaginationClick = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1
      });
    }
  };

  const handleSort = (sortBy: string) => {
    if (sortBy === sortBy) {
      setSortBy(sortBy);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortBy);
      setSortOrder("desc");
    }
  };

  const handleClear = () => {
    setFilters({ searchString: "", jobType: "", jobSkill: "" });
    setApiFilters({ searchString: "", jobType: "", jobSkill: "" });
    setSortBy("createdAt");
    setSortOrder("desc");
  };
   
  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>{" "}
          Back
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <input
            type="search"
            id="search-dropdown"
            className="flex-grow block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            name="searchString"
            onChange={handleChange}
            value={filters.searchString}
          />
          <select className="p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" name="jobType" onChange={handleChange} value={filters.jobType}>
            <option>Select Job Type</option>
            {jobTypes && jobTypes.apiResponse.result.map((jType:any) => (
              <option key={jType.id} value={jType.jobTypeName}>{jType.jobTypeName}</option>
            ))}
          </select>
          <select className="p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" name="jobSkill" onChange={handleChange} value={filters.jobSkill}>
            <option>Select Job Skill</option>
            {jobSkills && jobSkills.apiResponse.result.map((jSkill:any) => (
              <option key={jSkill.id} value={jSkill.skillName}>{jSkill.skillName}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-purple-400 rounded-md hover:bg-gray-100" onClick={handleFilters}>Filter</button>
          <button className="px-4 py-2 bg-purple-400 rounded-md hover:bg-gray-100" onClick={handleClear}>Clear All</button>
        </div>
      </div>

      <div className="flex">
        <div className="flex-grow">
          <button className="block text-left" onClick={() => handleSort("jobTitle")}>Job Title</button>
        </div>
        <div className="flex-none">
          <button className="block text-left" onClick={() => handleSort("createdAt")}>Created At</button>
        </div>
        {/* Add more headers for other columns */}
      </div>

      {jobs.map((job: any) => (
        <div key={job.id} className="mx-auto max-w-lg">
          <EmployeeJobCard job={job}/>
        </div>
      ))}

      <div className="flex items-center justify-end mt-4">
        <div>Rows per page</div>
        <div>
          <select className="mx-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handlePaginationClick("change", Number(e.target.value));
            setCurrentPageSize(Number(e.target.value));
          }} value={currentPageSize}> 
            <option>5</option>
            <option>10</option>
          </select>
        </div>
        <div className="mx-2">{getPageDetails()}</div>
        <button
          className="px-4 py-2 bg-purple-400 hover:bg-gray-100"
          disabled={pageOptions.pageNumber === 1}
          onClick={() => handlePaginationClick("prev")}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-purple-400 hover:bg-gray-100"
          disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
          onClick={() => handlePaginationClick("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobList;
