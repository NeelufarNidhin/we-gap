import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery } from "../API/employeeApi";

import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import {
 
  useGetEmployeeEducationQuery,
} from "../API/educationApi";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import {
 
  useGetEmployeeExperienceQuery,
} from "../API/experienceApi";
import { useGetEmployeeSkillQuery } from "../API/skillApi";
import SkillForm from "./SkillForm";

function EmployeeProfile() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  //const{data,isLoading} = useGetEducationByIdQuery(id);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);

  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [education, setEducation] = useState([]);

  const {
    data: educationData,
    isLoading: educationLoading,
    isError: educationIsError,
    error: educationError,
  } = useGetEmployeeEducationQuery(id);

  const [experience, setExperience] = useState([]);
  const {
    data: experienceData,
    isLoading: experienceLoading,
    isError: experienceIsError,
    error: experienceError,
  } = useGetEmployeeExperienceQuery(id);
 const [skills,setSkills] = useState([])
 const {
  data: skillData,
  isLoading: skillLoading,
  isError: skillIsError,
  error: skillError,
} = useGetEmployeeSkillQuery(id);


  useEffect(() => {
    if (!experienceLoading && !experienceIsError && experienceData) {
      setExperience(experienceData);
    }

    if (!educationLoading && !educationIsError && educationData) {
      setEducation(educationData);
    }

    if(!skillLoading && !skillIsError && skillData){
      setSkills(skillData)
    }
  }, [
    experienceData,
    experienceLoading,
    experienceIsError,
    educationData,
    educationLoading,
    educationError,
    skillData,
    skillLoading,
    skillIsError
  ]);

  const toggleExperienceForm = () => {
    setIsExperienceFormOpen(!isExperienceFormOpen);
  };

  const toggleEducationForm = () => {
    setIsEducationFormOpen(!isEducationFormOpen);
  };

  const toggleSkillform = () =>{
    setIsSkillFormOpen(!isSkillFormOpen);
  }

  const { data, isLoading, isSuccess, isError } = useGetEmployeeByIdQuery(id);
  console.log(data);
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="container mx-auto p-4 flex">
        <div className="mr-8">
          <img
            className="w-32 h-32 rounded-full mb-4 border border-gray-200"
            src={data.imageName}
            alt="Profile"
          />
          <h1 className="text-2xl font-bold">{userData.firstName}</h1>
          <p>Email: {userData.email}</p>
          <p>
            Address: {data.address}, {data.city}, {data.state} - {data.pincode}
          </p>
          <p>Mobile Number: {data.mobileNumber}</p>
        </div>

        <div className="flex-grow">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Experience</h2>
            <button
              onClick={toggleExperienceForm}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded"
            >
              {isExperienceFormOpen
                ? "Close Experience Form"
                : "Add Experience"}
            </button>
            {isExperienceFormOpen && <ExperienceForm />}
            {experience.map((exp: any) => (
              <div key={exp.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>Job Title: {exp.currentJobTitle}</p>
                <p>Company: {exp.companyName}</p>
                <p>Description: {exp.description}</p>
                <p>Status: {exp.isWorking ? "Working" : "Not Working"}</p>
              </div>
            ))}
          </div>
          {/* Education section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Education</h2>
            <button
              onClick={toggleEducationForm}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded"
            >
              {isEducationFormOpen ? "Close Education Form" : "Add Education"}
            </button>
            {isEducationFormOpen && <EducationForm />}
            {education.map((edu: any) => (
              <div key={edu.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>Degree: {edu.degree}</p>
                <p>Subject: {edu.subject}</p>
                <p>University: {edu.university}</p>
                <p>Percentage: {edu.percentage}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Job Skill</h2>
            <button
              onClick={toggleSkillform}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded"
            >
              {isSkillFormOpen ? "Close Skill Form" : "Add skill"}
            </button>
            {isSkillFormOpen && <SkillForm/>}
            {skills.map((skill: any) => (
              <div key={skill.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p> {skill.skillName}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>Error: {data.error.message}</p>;
  }

  return <div>{content}</div>;
}

export default EmployeeProfile;
