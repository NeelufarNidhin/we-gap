import React, { useState } from "react";
import { useCreateJobTypeMutation,  useGetJobTypeQuery,  } from "../API/jobTypeApi";
import ToastNotify from "../Helper/ToastNotify";

import JType from "./JType";

function JobType() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addJobtype] = useCreateJobTypeMutation();
 
  const [jobType, setJobType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  
  //const [pageSize, setPageSize] = useState(5);
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
  
  const {data,isLoading,isSuccess ,error} = useGetJobTypeQuery({})

  // if(!isLoading){
  //   const records = data.Slice(firstIndex,lastIndex)
  //   const nPage = Math.ceil(data.length/ recordsPerPage)
  //   const numbers = [...Array(nPage + 1).keys()].slice(1);
  // }
 let content 
 if(isLoading){
    content = <p>Loading....</p>
 }
 if(error){
   content = <p>Something went wrong </p>
 }
 else if (isSuccess && data){
  console.log(data)
  data.length > 0  ?(
    
    content = data.map ((type : any) =>{
        return (
           <JType type = {type}
           key = {type.id}
            ></JType>
        )
        
    })) 
    : (content = <h4> Table is Empty</h4>)
 }
//  const handlePageChange = (pageNumber: number) => {
//   setCurrentPage(pageNumber);
// };
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
          {/* Pagination */}
          {/* <div className="flex items-center justify-end mt-4">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded">Previous</button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={data.length < pageSize} className="px-4 py-2 bg-gray-200 text-gray-600 rounded">Next</button>
          </div> */}
        </div>
      )}
    </div>
    </div>
  );
}

export default JobType;
