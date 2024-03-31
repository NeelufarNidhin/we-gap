import React, { useEffect, useState } from 'react';
 
import { useGetJobSkillByIdQuery, } from '../API/jobskillApi';
import { useGetJobTypeByIdQuery } from '../API/jobTypeApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDeleteJobMutation } from '../API/jobApi';

interface Job {
    id: string;
    jobTitle: string;
    description: string;
    experience: string;
    salary: string;
    jobTypeId: string;
    jobSkill: string[];
}

interface JobCardProps {
    job: Job;
}

function JobCard({ job }: JobCardProps) {
  // const { data: jobTypeData, error: jobTypeError, isLoading: jobTypeLoading } = useGetJobTypeByIdQuery(job.jobTypeId);
   // const { data: jobSkillData, error: jobSkillError, isLoading: jobSkillLoading } = useGetJobSkillByIdQuery({ jobId: job.jobSkill } );
   const [jobSkillNames, setJobSkillNames] = useState([]);
   const [jobTypeName, setJobTypeName] = useState('');
const navigate = useNavigate();
  const [deleteJob] = useDeleteJobMutation();
   const handleJobDelete = async (id: string) =>{
      deleteJob(id)
   }

   const fetchJobSkillNames = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {};
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get( `${process.env.REACT_APP_API_URL}/jobSkill?jobIds=${job.jobSkill}`, {
            headers
        });
        
        setJobSkillNames(response.data.result.map((skill: any) => skill.skillName));
        console.log(jobSkillNames);
    } catch (error) {
        console.error('Error fetching job skill names:', error);
    }
};

 const fetchJobTypeName = async () => {
  try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      
      if (token) {
          headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get( `${process.env.REACT_APP_API_URL}/jobType/${job.jobTypeId}`, {
          headers
      });
      
      setJobTypeName(response.data.result.jobTypeName);
      console.log(jobTypeName);
  } catch (error) {
      console.error('Error fetching job type names:', error);
  }
};

    useEffect(() => {
      fetchJobSkillNames();
      fetchJobTypeName();
    }, []);

    // if (jobTypeLoading ) {
    //     return <div>Loading...</div>;
    // }

    // if (jobTypeError ) {
    //     return <div>Error fetching data</div>;
    // }

    return (
        <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{job.jobTitle}</h3>
            <p className="text-sm text-gray-600">Description: {job.description}</p>
            <p className="text-sm text-gray-600">Experience: {job.experience}</p>
            <p className="text-sm text-gray-600">Salary: {job.salary}</p>
            <p className="text-sm text-gray-600">Job Type: {jobTypeName}</p>
            {/* <p className="text-sm text-gray-600">Job Type: {jobTypeData?.jobTypeName}</p> */}
            <p className="text-sm text-gray-600">Job Skills: Job Skills: {jobSkillNames.join(', ')}</p>

            <div className="flex mt-2">
                  <button className="mx-2" onClick={() => navigate(`/jobForm/${job.id}`)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleJobDelete(job.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
        </div>
    );
}

export default JobCard;
