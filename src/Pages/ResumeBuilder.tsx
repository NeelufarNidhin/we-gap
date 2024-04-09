import React, { useState, useEffect } from "react";
import { useGetEmployeeByIdQuery } from "../API/employeeApi"; // Assuming API call structure
import "./ResumeBuilder.css"; // Import your CSS file
import { useParams } from "react-router-dom";

function ResumeBuilder() {

    const {id} = useParams();
  const { isLoading, data } = useGetEmployeeByIdQuery(id); // Fetch employee data

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

  useEffect(() => {
    if (!isLoading && data) {
      // Extract data upon successful fetch
      setResumeData({
        name: `${data.result.firstName} ${data.result.lastName}`, // Assuming last name exists
        email: data.result.email,
        address: `${data.result.address}, ${data.result.city}, ${data.result.state} - ${data.result.pincode}`,
        mobileNumber: data.result.mobileNumber,
        experiences: data.result.experiences || [], // Handle potential missing experience data
        education: data.result.education || [], // Handle potential missing education data
        skills: data.result.skills || [], // Handle potential missing skills data
      });
    }
  }, [isLoading, data]);

  const generateResume = () => {
    // Logic to format and structure resume content (replace with your implementation)
    // Consider using a library like react-pdf for PDF generation
    console.log("Resume generated! You can implement PDF creation here.");
  };

  return (
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

          <button onClick={generateResume}>Generate Resume</button>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;