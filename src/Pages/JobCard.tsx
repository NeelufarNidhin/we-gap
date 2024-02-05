import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

function JobCard({ job }: JobCardProps)  {
    const [jobTypeName, setJobTypeName] = useState('');
  const [jobSkillNames, setJobSkillNames] = useState([]);

  useEffect(() => {
    fetchJobTypeName();
    fetchJobSkillNames();
  }, []);

  const fetchJobTypeName = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/jobType/${job.jobTypeId}`);
      setJobTypeName(response.data.jobTypeName);
    } catch (error) {
      console.error('Error fetching job type name:', error);
    }
  };
  const fetchJobSkillNames = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/jobSkill?jobIds=${job.jobSkill}`);
      setJobSkillNames(response.data.map((skill:any) => skill.skillName));
      console.log(jobSkillNames)
    } catch (error) {
      console.error('Error fetching job skill names:', error);
    }
  };
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
    <h3 className="text-lg font-semibold mb-2">{job.jobTitle}</h3>
    <p className="text-sm text-gray-600">Description: {job.description}</p>
    <p className="text-sm text-gray-600">Experience: {job.experience}</p>
    <p className="text-sm text-gray-600">Salary: {job.salary}</p>
    <p className="text-sm text-gray-600">Job Type: {jobTypeName}</p>
    <p className="text-sm text-gray-600">Job Skills: {jobSkillNames.join(', ')}</p>
  </div>
  )
}

export default JobCard
