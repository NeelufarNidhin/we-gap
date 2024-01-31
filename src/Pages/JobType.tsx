import React, { useState } from "react";
import { useCreateJobTypeMutation,  useGetJobTypeQuery,  } from "../API/jobTypeApi";
import ToastNotify from "../Helper/ToastNotify";

import JType from "./JType";

function JobType() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addJobtype] = useCreateJobTypeMutation();
 
  const [jobType, setJobType] = useState("");
 
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleInputChange = (e: any) => {
    setJobType(e.target.value);
  };

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    addJobtype({
        jobTypeName : jobType
    })
   ToastNotify("Job Type Added");
    setJobType("")
  };
  
  const {data,isLoading,isSuccess,isError ,error} = useGetJobTypeQuery({})
 let content 
 if(isLoading){
    content = <p>Loading....</p>
 }
 else if (isSuccess){
    content = data.map ((type : any) =>{
        return (
           <JType type = {type}
           key = {type.id}
            ></JType>
        )
    })
 }

  return (
    <div>
      <section className="bg-gray-50 bg-violet-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white bg-violet-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Job Skill Id
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Skill Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ACTIONS
                    </th>

                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <button
          className="bg-violet-500 hover:bg--700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleForm}
        >
          {isFormOpen ? "" : "Add JobType"}
        </button>
        {isFormOpen && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4">
            {/* Close button within the form */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 font-bold float-right"
              onClick={toggleForm}
            >
              X
            </button>
            {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4"> */}
            <section className="p-6 bg-violet-300 text-gray-900">
              <form
                method="post"
                onSubmit={handleSubmit}
                className="container flex flex-col mx-auto space-y-12"
              >
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
                  <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium"></p>
                  </div>
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="companyName" className="text-sm">
                        Job Type{" "}
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder=""
                        value={jobType}
                        name="companyName"
                        onChange={handleInputChange}
                        className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      />
                    </div>
                  </div>
                </fieldset>
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobType;
