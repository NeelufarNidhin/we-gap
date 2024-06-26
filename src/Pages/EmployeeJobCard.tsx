import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { useGetEmployeeExistsQuery } from "../API/employeeApi";

interface Job {
  id: string;
  jobTitle: string;
  description: string;
  experience: string;
  salary: string;
  createdAt:string,
  jobTypeId: string;
  jobSkill: string[];
}
interface JobCardProps {
  job: Job;
}

function EmployeeJobCard({ job }: any) {
  const [jobSkillNames, setJobSkillNames] = useState([]);
  const [jobTypeName, setJobTypeName] = useState("");
  const [jobStatus, setJobStatus] = useState(false);
  const navigate = useNavigate();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const {data,isLoading} = useGetEmployeeExistsQuery(userData.id)
  const fetchJobApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if(!isLoading){
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/jobApplication/job/${job.id}?employeeId=${data.result.id}`,
          {
            headers,
          }
        );
       
        setJobStatus(
          response.data.result.status);
        
      }
     
      console.log(jobStatus)
    } catch (error) {
      console.error("Error job application status:", error);
    }
  };

  const fetchJobJobSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/job/${job.id}/jobJobSkills`,
        {
          headers,
        }
      );

      setJobSkillNames(
        response.data.result.map((jobJobSkill: any) => jobJobSkill.skillName)
      );
    } catch (error) {
      console.error("Error fetching job job skills:", error);
    }
  };

  const fetchJobTypeName = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/jobType/${job.jobTypeId}`,
        {
          headers,
        }
      );

      setJobTypeName(response.data.result.jobTypeName);
      //   console.log(jobTypeName);
    } catch (error) {
      console.error("Error fetching job type names:", error);
    }
  };

  useEffect(() => {
    fetchJobJobSkills();
    fetchJobTypeName();
    fetchJobApplication();
  }, []);

  return (
    <div className="flex justify-between items-center bg-zinc-100 px-6 py-6 my-4 border border-black">
      <div className="pb-2">
        <Link to={`/job/${job.id}/${job.employerId}`}></Link>
        <p>
          {job.jobTitle} - {job.employer.companyName}
        </p>
        <p>Job Type: {jobTypeName} </p>
        <div className="flex items-center gap-2 pt-2">
          {jobSkillNames.map((jskill: any) => (
            <p className=" border border-gray-500 py-.5 px-1 text-gray-600 rounded-md">
              {jskill}{" "}
            </p>
          ))}
        </div>
      </div>
      <div>
        <button
          className="border border-black rounded-md px-3 py-2 bg-"
          onClick={() => navigate(`/job/${job.id}/${job.employerId}`)}
          disabled={jobStatus}
        >
         {jobStatus ? "Applied" : "Apply now"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeJobCard;
