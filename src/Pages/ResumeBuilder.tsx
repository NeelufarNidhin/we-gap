import React, { useState, useEffect } from "react";
import { useGetEmployeeByIdQuery, useGetEmployeeExistsQuery } from "../API/employeeApi"; // Assuming API call structure
import { useParams } from "react-router-dom";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { useGetEmployeeExperienceQuery, useGetExperienceByIdQuery } from "../API/experienceApi";
import axios from "axios";

function ResumeBuilder() {

    const userData: userModel = useSelector((state: any) => state.userAuthStore);
//const {data: employeeData , isLoading : employeeLoading} = useGetEmployeeExistsQuery(userData.id);

  const { isLoading, data } = useGetEmployeeExistsQuery(userData.id); // Fetch employee data



  const [resumeData, setResumeData] = useState({
    // Initial resume data structure
    name: "",
    email: "",
    address: "",
    mobileNumber: "",
    experiences: [],
    education: [],
    skills: [],
  });
  const [experience,setExperience] =  useState([]);
  
  useEffect(() => {
    if (!isLoading && data) {
      // Extract data upon successful fetch
       
      setResumeData({
        name: `${userData.firstName} ${userData.lastName}`, // Assuming last name exists
        email: data.result.email,
        address: `${data.result.address}, ${data.result.city}, ${data.result.state} - ${data.result.pincode}`,
        mobileNumber: data.result.mobileNumber,
        experiences: experience || [], // Handle potential missing experience data
        education: data.result.education || [], // Handle potential missing education data
        skills: data.result.skills || [], // Handle potential missing skills data
      });

      fetchExperienceData(data.id);
    fetchEducationData(data.id);
    fetchSkillsData(data.id);
    }
  }, [isLoading, data]);


  const fetchExperienceData = async (employeeId : string) => {
    try {
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {};
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
  
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/experience/employee/${employeeId}`,
            {
              headers,
            }
          );
      
          setExperience(response.data.result);
      
          // Update resume data after fetching experience data
          setResumeData((prevResumeData) => ({
            ...prevResumeData,
            experiences: response.data.result || [],
          }));
        } catch (error) {
          console.error("Error fetching experience data:", error);
        }
  };
  
  const fetchEducationData = (employeeId :  string) => {
    
  };
  
  const fetchSkillsData = (employeeId : string) => {
    
  };
  const generateResume = () => {
    // Logic to format and structure resume content (replace with your implementation)
    // Consider using a library like react-pdf for PDF generation
    console.log("Resume generated! You can implement PDF creation here.");
  };

  return (
    <>
    <div className="resume-container">
      {isLoading ? (
        <p>Loading your profile...</p>
      ) : (
        <div>
          {/* Contact Information Section */}
          <h2>Contact Information</h2>
          <ul>
            <li>{resumeData.name}</li>
            <li>{resumeData.email}</li>
            <li>{resumeData.address}</li>
            <li>{resumeData.mobileNumber}</li>
          </ul>

          {/* Experience Section */}
          <h2>Experience</h2>
          {resumeData.experiences.length === 0 && <p>No experience listed.</p>}
          {resumeData.experiences.map((exp : any, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.currentJobTitle}</h3>
              <h4>{exp.companyName}</h4>
              <p>{exp.description}</p>
            </div>
          ))}

          {/* Education Section */}
          <h2>Education</h2>
          {resumeData.education.length === 0 && <p>No education listed.</p>}
          {resumeData.education.map((edu: any, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <h4>{edu.university}</h4>
              <p>{edu.subject} ({edu.percentage}%)</p>
            </div>
          ))}

          {/* Skills Section */}
          <h2>Skills</h2>
          {resumeData.skills.length === 0 && <p>No skills listed.</p>}
          <ul>
            {resumeData.skills.map((skill:any, index) => (
              <li key={index}>{skill.skillName}</li>
            ))}
          </ul>

         
        </div>
       
      )}


    </div>
    <button className="bg-purple-500 text-white px-4 py-2  border border-black rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50" onClick={generateResume}>Generate Resume</button>
    </>
  );
}

export default ResumeBuilder;