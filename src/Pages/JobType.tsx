import React, { useEffect, useState } from "react";
import { useCreateJobTypeMutation,  useGetJobTypeQuery,  } from "../API/jobTypeApi";


import JType from "./JType";

function JobType() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addJobtype] = useCreateJobTypeMutation();
 
  const [jobType, setJobType] = useState("");

  const [totalRecords,setTotalRecords] = useState(0);
  const [ pageOptions , setPageOptions] = useState({
   pageNumber : 1,
   pageSize : 5
  })
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);

  
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobType(e.target.value);
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addJobtype({
        jobTypeName : jobType
    })
   //ToastNotify("Job Type Added");
    setJobType("")
  };
  
  const {data,isLoading,isSuccess ,error} = useGetJobTypeQuery({
    pageNumber : pageOptions.pageNumber,
    pageSize : pageOptions.pageSize
  })

  useEffect(() => {
    if (data){
      const {TotalRecords} = JSON.parse(data?.totalRecords);
      setTotalRecords(TotalRecords);
    }
  },[data]);

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
        pageSize: pageSize? pageSize : 5 ,
        pageNumber : 1
      })
    }
  }

 let content 
 if(isLoading){
    content = <p>Loading....</p>
 }
 if(error){
   content = <p>Something went wrong </p>
 }
 else if (isSuccess && data.apiResponse.result){
  console.log(data.apiResponse.result)
  data.apiResponse.result.length > 0   &&(
    
    content = data.apiResponse.result.map ((type : any) =>{
        return (
           <JType type = {type}
           key = {type.id}
            ></JType>
        )
        
    })) 
    // : (content = <h4> Table is Empty</h4>)
 }

  return (
    <div>

 <div className="container mx-auto p-4">
      {/* Add Job Type Form */}
      <div className="flex items-center justify-between mb-4">
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded" onClick={toggleForm}>
          {isFormOpen ? "Close Form" : "Add Job Type"}
        </button>
      </div>
      {isFormOpen && (
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <label className="text-gray-600">Job Type:</label>
              <input type="text" value={jobType} onChange={handleInputChange} required className="border border-gray-300 rounded-md px-2 py-1" />
              <button type="submit" className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">Add</button>
            </div>
          </form>
        </div>
      )}
     
    
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
             
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Job Type ID</th>
                  <th className="px-4 py-2">Job Type Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
            
              <tbody>
                {content}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end p-4">
          <div>Rows per page</div>
          <div>
            <select className="mx-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>{
              handlePaginationClick("change", Number(e.target.value));
              setCurrentPageSize(Number(e.target.value))
            }} value={currentPageSize}> 
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
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
      )}
    </div>
    </div>
  );
}

export default JobType;
