import React, { FormEvent, useState } from "react";
import { useCreateJobSkillMutation,  useGetJobSkillQuery,  } from "../API/jobskillApi";
import ToastNotify from "../Helper/ToastNotify";
import Skill from "./Skill";

function Jobskill() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addJobskill,{data:jskill,isLoading:jskillLoading,isSuccess:jskillIsSuccess,error:jskillError}] = useCreateJobSkillMutation();
  const [jobSkill, setJobSkill] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
  
  const {data,isLoading,isSuccess ,error} = useGetJobSkillQuery({})
 let content 
 if(isLoading){
    content = <p>Loading....</p>
 }
 if(error){
  content = <p>Something went wrong</p>
 }
 else if (isSuccess && data){
  console.log(data)
  data.length > 0  ?(
    
    content = data.map ((skill : any) =>{
        return (
           <Skill skill  = {skill}
           key = {skill.id}
            ></Skill>
        )
      })) 
      : (content = <h4> Table is Empty</h4>)
   }
 const handlePageChange = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};

  return (
    <div>
     <div className="container mx-auto p-4">
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
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded">Previous</button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={data.length < pageSize} className="px-4 py-2 bg-gray-200 text-gray-600 rounded">Next</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Jobskill;
