import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../API/jobApi";
import axios from "axios";

function JobDetail() {
  const { jobId } = useParams();
  const { data, isLoading, isSuccess, error } = useGetJobByIdQuery(jobId);
  const [jobSkillNames, setJobSkillNames] = useState([]);
  const [jobTypeName, setJobTypeName] = useState("");
  const navigate = useNavigate();
  const formatDateTime = (timestamp :string) => {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleString(undefined, {
         year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
  const fetchJobJobSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/job/${jobId}/jobJobSkills`,
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

  const fetchJobTypeName = async (jobTypeId: string) => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/jobType/${jobTypeId}`,
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
    if (!isLoading && isSuccess && data.result) {
      fetchJobTypeName(data.result.jobTypeId);
    }
    fetchJobJobSkills();
  }, []);

  return (
    <div>
      {!isLoading && isSuccess && data.result && (
        <div className="container mx-auto mt-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <div className="p-4 mt-4 text-gray-800">
              <h3 className="text-xl bg-gray-200 font-bold">
                JobTitle:{data.result.jobTitle}
              </h3>
              <p >Salary :{data.result.salary}</p>
              <p >
                Experience: {data.result.experience}
              </p>
              <p>Job Type: {jobTypeName} </p>
              <div className="flex items-center gap-2 pt-2 ">
                <p>Job Skill :</p>
                {jobSkillNames.map((jskill: any) => (
                  <p className=" border border-gray-500 py-.5 px-1 mt-1 text-gray-600 rounded-md">
                    {jskill}{" "}
                  </p>
                ))}
              </div>
              <h4 >
                Description:{data.result.description}
              </h4>
              <p>Posted Date : {formatDateTime( data.result.createdAt)}</p>
            </div>

            <div>
              <button className="border border-black rounded-md px-3 py-2 mx-2 bg-violet-300">
                Apply now
              </button>
              <button
                className="border border-black rounded-md px-3 py-2 mx-2 bg-violet-300"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetail;
