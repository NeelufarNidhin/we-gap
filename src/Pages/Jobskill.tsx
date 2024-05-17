import React, {  useEffect, useState } from "react";
import { useCreateJobSkillMutation,  useGetJobSkillQuery,  } from "../API/jobskillApi";

import Skill from "./Skill";

function Jobskill() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addJobskill,{isSuccess:jskillIsSuccess}] = useCreateJobSkillMutation();
  const [jobSkill, setJobSkill] = useState("");
  const [totalRecords,setTotalRecords] = useState(0);
  const [ pageOptions , setPageOptions] = useState({
   pageNumber : 1,
   pageSize : 10
  })
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobSkill(e.target.value);
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    await addJobskill({
      skillName : jobSkill
    })
    if(jskillIsSuccess)
    //  ToastNotify("Job Skill Added")
   
    setJobSkill("") 
   
  };
  
  const {data,isLoading,isSuccess ,error} = useGetJobSkillQuery({
    pageNumber : pageOptions.pageNumber,
    pageSize : pageOptions.pageSize
  })


  useEffect(() => {
    if (data  && data.totalRecords){
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
      setPageOptions({pageSize: 10 , pageNumber: pageOptions.pageNumber - 1});
    } else if (direction === "next" ){
      setPageOptions({pageSize:10 , pageNumber: pageOptions.pageNumber + 1});
    }else if(direction === "change"){
      setPageOptions({
        pageSize: pageSize? pageSize : 10 ,
        pageNumber : 1
      })
    }
  }
 let content 
 if(isLoading){
    content = <p>Loading....</p>
 }
 if(error){
  content = <p>Something went wrong</p>
 }
 else if (isSuccess && data.apiResponse.result){
  console.log(data.apiResponse.result)
  data.apiResponse.result.length > 0  &&(
    
    content = data.apiResponse.result.map ((skill : any) =>{
        return (
           <Skill skill = {skill}
           key = {skill.id}
            ></Skill>
        )
        
    })) 
    // : (content = <h4> Table is Empty</h4>)
 }
 

  return (
    
     <div className="container flex-grow mx-auto p-4">
      {/* Add Job Skill Form */}
      <div className="flex items-center justify-between mb-4">
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded" onClick={toggleForm}>
          {isFormOpen ? "Close Form" : "Add Job Skill"}
        </button>
      </div>
      {isFormOpen && (
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <label className="text-gray-600">Job Skill:</label>
              <input type="text" value={jobSkill} onChange={handleInputChange} required className="border border-gray-300 rounded-md px-2 py-1" />
              <button type="submit" className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">Add</button>
            </div>
          </form>
        </div>
      )}
      
      {/* Job Skill Table */}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
              {/* Table header */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Job Skill ID</th>
                  <th className="px-4 py-2">Skill Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {content}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-end mt-4">
          <div>Rows per page</div>
          <div>
            <select className="mx-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>{
              handlePaginationClick("change", Number(e.target.value));
              setCurrentPageSize(Number(e.target.value))
            }} value={currentPageSize}> 
            <option>10</option>
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
   
  );
}

export default Jobskill;
