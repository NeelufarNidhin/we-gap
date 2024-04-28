import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "../API/employeeApi";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import {
  useDeleteEducationMutation,
  useGetEmployeeEducationQuery,
} from "../API/educationApi";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import ResumeDocument from "./ResumeDocument";
import {
  useDeleteExperienceMutation,
  useGetEmployeeExperienceQuery,
} from "../API/experienceApi";
import {
  useDeleteSkillMutation,
  useGetEmployeeSkillQuery,
} from "../API/skillApi";
import SkillForm from "./SkillForm";

// Import icons
import { FaEdit, FaTrashAlt,FaDownload  } from "react-icons/fa";

import jsPDF from "jspdf";

function EmployeeProfile() {
  const { id } = useParams();
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: any) => state.userAuthStore);

  const [education, setEducation] = useState([]);
  const { data: educationData, isLoading: educationLoading } =
    useGetEmployeeEducationQuery(id);

  const [experience, setExperience] = useState([]);
  const { data: experienceData, isLoading: experienceLoading } =
    useGetEmployeeExperienceQuery(id);

  const [skills, setSkills] = useState([]);
  const { data: skillData, isLoading: skillLoading } =
    useGetEmployeeSkillQuery(id);

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
  }, [
    experienceData,
    experienceLoading,
    educationData,
    educationLoading,
    skillData,
    skillLoading,
  ]);

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
  const generateResume = () => {
    if (data && experienceData && educationData && skillData) {
      const employeeInfo = data.result;
      const experienceInfo = experienceData.result;
      const educationInfo = educationData.result;
      const skillInfo = skillData.result;

      const doc = new jsPDF();
      let yPos = 10;

      // Set default font
      doc.setFont("helvetica");

      // Add Profile Picture
      const imgData = employeeInfo.imageName; // Assuming imageName is a URL
      const imgWidth = 40;
      const imgHeight = 40;
      doc.addImage(imgData, "JPEG", 10, yPos, imgWidth, imgHeight);
      yPos += imgHeight + 5;

      // Add Personal Information
      doc.setFontSize(14);
      doc.setTextColor("#333333");
      doc.text(`Personal Information:`, 10, yPos);
      yPos += 10;
      doc.setFontSize(12);
      doc.setTextColor("#666666");
      doc.text(`Name: ${userData.firstName} ${userData.lastName}`, 10, yPos);
      yPos += 10;
      doc.text(`Email: ${userData.email}`, 10, yPos);
      yPos += 10;
      doc.text(
        `Address: ${employeeInfo.address}, ${employeeInfo.city}, ${employeeInfo.state} - ${employeeInfo.pincode}`,
        10,
        yPos
      );
      yPos += 10;
      doc.text(`Mobile Number: ${employeeInfo.mobileNumber}`, 10, yPos);
      yPos += 15;

      // Add Experience
      doc.setFontSize(14);
      doc.setTextColor("#333333");
      doc.text(`Experience:`, 10, yPos);
      yPos += 10;
      experienceInfo.forEach((exp: any) => {
        doc.setFontSize(12);
        doc.setTextColor("#666666");
        doc.text(`- Job Title: ${exp.currentJobTitle}`, 15, yPos);
        yPos += 7;
        doc.text(`  Company: ${exp.companyName}`, 15, yPos);
        yPos += 7;
        doc.text(`  Description: ${exp.description}`, 15, yPos);
        yPos += 7;
        doc.text(
          `  Status: ${exp.isWorking ? "Working" : "Not Working"}`,
          15,
          yPos
        );
        yPos += 10;
      });

      // Add Education
      doc.setFontSize(14);
      doc.setTextColor("#333333");
      doc.text(`Education:`, 10, yPos);
      yPos += 10;
      educationInfo.forEach((edu: any) => {
        doc.setFontSize(12);
        doc.setTextColor("#666666");
        doc.text(`- Degree: ${edu.degree}`, 15, yPos);
        yPos += 7;
        doc.text(`  Subject: ${edu.subject}`, 15, yPos);
        yPos += 7;
        doc.text(`  University: ${edu.university}`, 15, yPos);
        yPos += 7;
        doc.text(`  Percentage: ${edu.percentage}%`, 15, yPos);
        yPos += 10;
      });

      // Add Skills
      doc.setFontSize(14);
      doc.setTextColor("#333333");
      doc.text(`Skills:`, 10, yPos);
      yPos += 10;
      skillInfo.forEach((skill: any) => {
        doc.setFontSize(12);
        doc.setFont("bold");
        doc.setTextColor("#666666");
        doc.text(`- ${skill.skillName}`, 15, yPos);
        yPos += 7;
      });

      // Add border
      doc.setDrawColor("#999999");
      doc.setLineWidth(0.5);
      doc.rect(5, 5, 200, yPos - 5); // Border for content
      doc.rect(5, 5, 200, 292); // Border for page

      // Save the PDF
      doc.save("resume.pdf");
    } else {
      console.error("Error: Data is missing for generating resume");
    }
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data && data.result) {
    // {generateResume()}
    content = (
      <div className="flex flex-col md:flex-row bg-violet-100 gap-4">
        <div className="md:w-1/4 ">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-32 h-32 rounded-full mb-4 border border-gray-200"
              src={data.result.imageName}
              alt="Profile"
            />
            <h1 className="text-2xl font-bold">{userData.firstName}</h1>
            <p>Email: {userData.email}</p>
            <p>
              Address: {data.result.address}, {data.result.city},{" "}
              {data.result.state} - {data.result.pincode}
            </p>
            <p>Mobile Number: {data.result.mobileNumber}</p>
            <div className="flex mt-2">
              <button
                className="mx-2"
                onClick={() => navigate(`/employeeForm/${data.result.id}`)}
              >
                <FaEdit />
              </button>
              <button onClick={() => handleEmployeeDelete(data.result.id)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-3/4 ">
          <div className=" bg-violet-100 p-4 rounded-lg shadow-md">
            <div className="mb-4  ">
              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              <button
                onClick={toggleExperienceForm}
                className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded"
              >
                {isExperienceFormOpen
                  ? "Close Experience Form"
                  : "Add Experience"}
              </button>
              {isExperienceFormOpen && <ExperienceForm />}
              {experience.map((exp: any) => (
                <div key={exp.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                  <p className="text-lg font-semibold">{exp.currentJobTitle}</p>
                  <p className="text-gray-600">Company: {exp.companyName}</p>
                  <p className="text-gray-600">Description: {exp.description}</p>
                  <p className="text-gray-600">
                    Status: {exp.isWorking ? "Working" : "Not Working"}
                  </p>
                  <div className="flex mt-2">
                    <button
                      className="mx-2"
                      onClick={() => navigate(`/experienceForm/${exp.id}`)}
                    >
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
              <button
                onClick={toggleEducationForm}
                className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded"
              >
                {isEducationFormOpen ? "Close Education Form" : "Add Education"}
              </button>
              {isEducationFormOpen && <EducationForm />}
              {education.map((edu: any) => (
                <div key={edu.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                 <p className="text-lg font-semibold">{edu.degree}</p>
                  <p className="text-gray-600">Subject: {edu.subject}</p>
                  <p className="text-gray-600">University: {edu.university}</p>
                  <p className="text-gray-600">Percentage: {edu.percentage}</p>
                  <div className="flex mt-2">
                    <button
                      className="mx-2"
                      onClick={() => navigate(`/educationForm/${edu.id}`)}
                    >
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
              <button
                onClick={toggleSkillform}
                className="px-4 py-2  bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded"
              >
                {isSkillFormOpen ? "Close Skill Form" : "Add skill"}
              </button>
              {isSkillFormOpen && <SkillForm />}
              {skills.map((skill: any) => (
                <div key={skill.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                 <p className="text-lg font-semibold">{skill.skillName}</p>
                  <div className="flex mt-2">
                    <button
                      className="mx-2"
                      onClick={() => navigate(`/skillForm/${skill.id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => handleSkillDelete(skill.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <button
                  onClick={generateResume}
                  className="px-4 py-2 bg-violet-500 text-white font-semibold rounded"
                >
                  <FaDownload className="inline-block mr-2" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default EmployeeProfile;
