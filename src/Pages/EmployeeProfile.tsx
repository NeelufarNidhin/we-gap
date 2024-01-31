import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import employeeModel from "../Interfaces/employeeModel";
import { useGetEmployeeByIdQuery } from "../API/employeeApi";
import defaultImageSrc from "../Assets/Images/profil-pic2.jpeg";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
interface Props {
  employeeItem?: employeeModel;
}

function EmployeeProfile(props: Props) {
  const { id } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const openForm = () => {
    setIsOpen(!isOpen);
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
    useGetEmployeeByIdQuery(id);

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    console.log(data);
    content = (
      <div className="flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 bg-gradient-to-br">
        <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
          <div className="pb-6">
            <div className="flex flex-wrap justify-center">
              <div className="flex justify-center w-full">
                <div className="relative">
                  <img
                    src={defaultImageSrc}
                    className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[100px]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 mt-20 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                {data.applicationUser.firstName} {data.applicationUser.lastName}
              </h3>
              <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                  {data.applicationUser.email}
                </div>
              </div>
              <div className="w-full text-center">
                <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                  <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                    <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                      {data.city}{" "}
                    </div>
                    <div>
                      <br />
                    </div>
                    <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                      {data.state}
                    </div>
                    <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                      {data.applicationUser.mobileNumber}
                    </div>{" "}
                    <br />
                    <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                      {data.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-6">
                  <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {data.bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
              <div className="absolute flex -space-x-12 rounded-b-2xl">
                <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal toggle --> */}
        <button
          className="bg-violet-500  hover:bg--700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleForm}
        >
          {isFormOpen ? "" : "Add Experience"}
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
            <div>{<ExperienceForm />}</div>
          </div>
        )}
        <button
          className="bg-violet-500  hover:bg--700 text-white font-bold py-2 px-4 rounded"
          onClick={openForm}
        >
          {isOpen ? "" : "Add Education"}
        </button>
        {isOpen && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4">
            {/* Close button within the form */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 font-bold float-right"
              onClick={openForm}
            >
              X
            </button>

            <div>{<EducationForm />}</div>
          </div>
        )}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default EmployeeProfile;
