import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery } from "../API/employeeApi";
import axios from "axios";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";

function EmployeeProfile() {
  const { id } = useParams();
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEducation();
    fetchExperience();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/education");
      setEducation(response.data);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/experience");
      setExperience(response.data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  const toggleExperienceForm = () => {
    setIsExperienceFormOpen(!isExperienceFormOpen);
  };

  const toggleEducationForm = () => {
    setIsEducationFormOpen(!isEducationFormOpen);
  };

  const { data, isLoading, isSuccess, isError } = useGetEmployeeByIdQuery(id);

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = (
      <div className="bg-white p-4 shadow-sm rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-900 font-bold text-2xl">
            {data.applicationUser.firstName} {data.applicationUser.lastName}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>{" "}
            Back
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <p>Email: {data.applicationUser.userName}</p>
          <p>Address: {data.address}, {data.city}, {data.state} - {data.pincode}</p>
          <p>Mobile Number: {data.mobileNumber}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Experience</h2>
          <button
            onClick={toggleExperienceForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isExperienceFormOpen ? "Close" : "Add Experience"}
          </button>
          {isExperienceFormOpen && <ExperienceForm />}
          {experience.map((exp:any) => (
            <div key={exp.id} className="bg-gray-100 p-4 rounded-lg mt-2">
              <p>Job Title: {exp.currentJobTitle}</p>
              <p>Company: {exp.companyName}</p>
              <p>Description: {exp.description}</p>
              <p>Status: {exp.isWorking ? "Working" : "Not Working"}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold">Education</h2>
          <button
            onClick={toggleEducationForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEducationFormOpen ? "Close" : "Add Education"}
          </button>
          {isEducationFormOpen && <EducationForm />}
          {education.map((edu:any) => (
            <div key={edu.id} className="bg-gray-100 p-4 rounded-lg mt-2">
              <p>Degree: {edu.degree}</p>
              <p>Subject: {edu.subject}</p>
              <p>University: {edu.university}</p>
              <p>Percentage: {edu.percentage}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>Error: {data.error.message}</p>;
  }

  return <div>{content}</div>;
}

export default EmployeeProfile;
