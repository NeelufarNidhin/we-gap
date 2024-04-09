import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery } from "../API/employeeApi";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import { 
  useDeleteEducationMutation,
  useGetEmployeeEducationQuery,
} from "../API/educationApi";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";

import { 
  useDeleteExperienceMutation,
  useGetEmployeeExperienceQuery,
} from "../API/experienceApi";
import { useDeleteSkillMutation, useGetEmployeeSkillQuery } from "../API/skillApi";
import SkillForm from "./SkillForm";

// Import icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfTest from "./PdfTest";

function EmployeeProfile() {
  const { id } = useParams();
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: any) => state.userAuthStore);

  const [education, setEducation] = useState([]);
  const { data: educationData, isLoading: educationLoading } = useGetEmployeeEducationQuery(id);

  const [experience, setExperience] = useState([]);
  const { data: experienceData, isLoading: experienceLoading } = useGetEmployeeExperienceQuery(id);

  const [skills, setSkills] = useState([]);
  const { data: skillData, isLoading: skillLoading } = useGetEmployeeSkillQuery(id);

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const handleEmployeeDelete = async (id: string) => {
    deleteExperience(id);
    deleteEducation(id);
    deleteSkill(id);
    deleteEmployee(id);
  };

  const [deleteExperience] = useDeleteExperienceMutation();
  const handleExperienceDelete = async (id: string) => {
    deleteExperience(id);
  };

  const [deleteEducation] = useDeleteEducationMutation();
  const handleEducationDelete = async (id: string) => {
    deleteEducation(id);
  };

  const [deleteSkill] = useDeleteSkillMutation();
  const handleSkillDelete = async (id: string) => {
    deleteSkill(id);
  };

  useEffect(() => {
    if (!experienceLoading && experienceData?.result) {
      setExperience(experienceData.result);
    }
    if (!educationLoading && educationData?.result) {
      setEducation(educationData.result);
    }
    if (!skillLoading && skillData?.result) {
      setSkills(skillData.result);
    }
  }, [experienceData, experienceLoading, educationData, educationLoading, skillData, skillLoading]);

  const toggleExperienceForm = () => {
    setIsExperienceFormOpen(!isExperienceFormOpen);
  };

  const toggleEducationForm = () => {
    setIsEducationFormOpen(!isEducationFormOpen);
  };

  const toggleSkillform = () => {
    setIsSkillFormOpen(!isSkillFormOpen);
  };

  const { data, isLoading } = useGetEmployeeByIdQuery(id);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data && data.result) {
    content = (
      <div className="container mx-auto p-4 flex">
        <div className="mr-8">
          <img className="w-32 h-32 rounded-full mb-4 border border-gray-200" src={data.result.imageName} alt="Profile" />
          <h1 className="text-2xl font-bold">{userData.firstName}</h1>
          <p>Email: {userData.email}</p>
          <p>Address: {data.result.address}, {data.result.city}, {data.result.state} - {data.result.pincode}</p>
          <p>Mobile Number: {data.result.mobileNumber}</p>
          <div className="flex mt-2">
                  <button className="mx-2" onClick={() => navigate(`/employeeForm/${data.result.id}`)}>

                    <FaEdit />
                  </button>
                  <button onClick={() => handleEmployeeDelete(data.result.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
                {/* <div> <PDFDownloadLink document={<PdfTest/>}   fileName="FORM" >
            {({loading }) => (loading ? <button> Loading document..</button> : <button>Download</button> )}
             </PDFDownloadLink>  </div> */}
        </div>
         

        <div className="flex-grow">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Experience</h2>
            <button onClick={toggleExperienceForm} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded">
              {isExperienceFormOpen ? "Close Experience Form" : "Add Experience"}
            </button>
            {isExperienceFormOpen && <ExperienceForm />}
            {experience.map((exp: any) => (
              <div key={exp.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>Job Title: {exp.currentJobTitle}</p>
                <p>Company: {exp.companyName}</p>
                <p>Description: {exp.description}</p>
                <p>Status: {exp.isWorking ? "Working" : "Not Working"}</p>
                <div className="flex mt-2">
                  <button className="mx-2" onClick={() => navigate(`/experienceForm/${exp.id}`)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleExperienceDelete(exp.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Education</h2>
            <button onClick={toggleEducationForm} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded">
              {isEducationFormOpen ? "Close Education Form" : "Add Education"}
            </button>
            {isEducationFormOpen && <EducationForm />}
            {education.map((edu: any) => (
              <div key={edu.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>Degree: {edu.degree}</p>
                <p>Subject: {edu.subject}</p>
                <p>University: {edu.university}</p>
                <p>Percentage: {edu.percentage}</p>
                <div className="flex mt-2">
                  <button className="mx-2" onClick={() => navigate(`/educationForm/${edu.id}`)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleEducationDelete(edu.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Job Skill</h2>
            <button onClick={toggleSkillform} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded">
              {isSkillFormOpen ? "Close Skill Form" : "Add skill"}
            </button>
            {isSkillFormOpen && <SkillForm />}
            {skills.map((skill: any) => (
              <div key={skill.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>{skill.skillName}</p>
                <div className="flex mt-2">
                  <button className="mx-2" onClick={() => navigate(`/skillForm/${skill.id}`)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleSkillDelete(skill.id)}>
                    <FaTrashAlt />
                  </button>

                </div>
              </div>
            ))}
          </div>
          </div>
  </div>    
    );
  } 
  

  return <div>{content}</div>;
}

export default EmployeeProfile;


