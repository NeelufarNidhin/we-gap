import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employerModel from "../Interfaces/employerModel";
import { useGetEmployerByIdQuery } from "../API/employerApi";
import JobForm from "./JobForm";

interface Props {
  employerItem?: employerModel;
}

function EmployerProfile(props: Props) {
  //  const [employers,setEmployers] = useState<employerModel>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { id } = useParams();
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  

  const handleInputChange = (e: any) => {
    // setJobSkill(e.target.value);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
//     addJobskill({
//         skillName : jobSkill
//     })
//    ToastNotify("Skill Added");
//     setJobSkill("")
  };
  const { data, isLoading, isSuccess, isError, error } =
    useGetEmployerByIdQuery(id);
  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    content = (
      <div>
        <div className="h-full bg-gray-200 p-8">
          <div className="w-full h-[250px]">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
              className="w-40 border-4 border-white rounded-full"
            />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{data.companyName}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
            </div>
            <p className="text-gray-700">{data.location}</p>
            <p className="text-sm text-gray-500">{data.website}</p>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              {/* <!-- Modal toggle --> */}
              <button
          className="bg-violet-500 hover:bg--700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleForm}
        >
          {isFormOpen ? "" : "Add JobSkill"}
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
            <div>
           { <JobForm/>}
           </div>
            
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
}

export default EmployerProfile;
