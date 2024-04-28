import React, { useEffect, useState } from 'react'
import { useCreateSkillMutation,  useGetSkillByIdQuery, useUpdateSkillMutation } from '../API/skillApi';
import apiResponse from '../Interfaces/apiResponse';
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotify from '../Helper/ToastNotify';
import inputHelper from '../Helper/inputHelper';
import { useGetJobSkillQuery } from '../API/jobskillApi';


interface SkillData {
  skillName: string;
  employeeId: string;
  otherSkill:string;
}
function SkillForm(skillid : any) {

  const initialValues = {
    skillName : "",
    employeeId:"",
    otherSkill: ''
  }
    const {id} = useParams()
   // const [skillName,setSkillName] = useState("");
   const [values ,setValues] = useState(initialValues);
    const [addSkill] = useCreateSkillMutation()
    const [jobSkills, setJobSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState("");
    const {skillId} = useParams()
    const {data,isLoading,error,isSuccess} = useGetSkillByIdQuery(skillId)

    const {data:jobSkillData , isLoading:jobSkillLoading , error:jobSkillError} = useGetJobSkillQuery({})
    const navigate = useNavigate();
    useEffect(() => {
      if(!isLoading && data && data.result){
        console.log(data.result)
        const tempData:SkillData = {
          skillName : data.result.skillName,
          employeeId : data.result.employeeId,
          otherSkill:""
        }
        setValues(tempData)
      }
      if(!jobSkillLoading && jobSkillData){
        console.log(jobSkillData)
        setJobSkills(jobSkillData.apiResponse.result)
      }
    },[data,isLoading ,jobSkillData,jobSkillLoading])

    const [updateSkill] = useUpdateSkillMutation();
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const tempData = inputHelper(e,values);
      setValues(tempData);
      // setSkillName(e.target.value)
    }
    const handleSelectChange = (e :any) => {
      const selected = e.target.value;
      setSelectedSkill(selected);
  
      if (selected === 'other') {
        setValues({ ...values, skillName: '', otherSkill: '' });
      } else {
        setValues({ ...values, skillName: selected, otherSkill: '' });
      }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
       let response :apiResponse ;
       if (selectedSkill === 'other') {
        // If the user selects 'other', update the skillName with the otherSkill value
        const updatedValues = { ...values, skillName: values.otherSkill };
        
        if (skillId) {
          response = await updateSkill({
            id: skillId,
            skillName: updatedValues.skillName,
            employeeId: updatedValues.employeeId
          });
        } else {
          response = await addSkill({
            skillName: updatedValues.skillName,
            employeeId: id
          });
        }
      } else {
        // Use the existing values for skillName
        if (skillId) {
          response = await updateSkill({
            id: skillId,
            skillName: values.skillName,
            employeeId: values.employeeId
          });
        } else {
          response = await addSkill({
            skillName: values.skillName,
            employeeId: id
          });
        }
      }
         if (response.data && response.data.isSuccess){
          console.log(response.data.result);
         setValues(initialValues)
         }
         else if (response.error || !response.data?.isSuccess) {
          console.log(response.error)
          ToastNotify(response.error?.data?.errorMessages[0],"error");
         }
    }
  return (
    <div>
     
      <section className="p-6 bg-violet-300 text-gray-900">
	<form method="post" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add Skill</p>
				
			</div>
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-3">
                <label htmlFor="jobSkill" className="text-sm">Select Skill</label>
                <select id="jobSkill" onChange={handleSelectChange} value={selectedSkill} className="w-full rounded-md focus:ring focus:ring-violet-800 focus:ring-opacity-50 dark:border-gray-700 dark:text-gray-900">
                  <option value="">Select Skill</option>
                  {jobSkills.map((skill :any) => (
                    <option key={skill.id} value={skill.skillName}>{skill.skillName}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              {selectedSkill === 'other' && (
                <div className="col-span-3">
                  <label htmlFor="otherSkill" className="text-sm">Other Skill</label>
                  <input id="otherSkill" type="text" placeholder="Other Skill" required value={values.otherSkill} name='otherSkill' onChange={handleInputChange}
                    className="w-full rounded-md focus:ring focus:ring-violet-800 focus:ring-opacity-50 dark:border-gray-700 dark:text-gray-900" />
                </div>
              )}
            </div>
            </fieldset>
            <div className="flex justify-between">
            <button
              type="submit"
              className="w-full px-8 mx-4 py-3 font-semibold rounded-md bg-violet-400 text-white"
            >
              Submit
            </button>

            {/* <button
              onClick={() => navigate(-1)}
              className="w-full px-8 py-3  mx-4 font-semibold rounded-md bg-violet-400 text-white"
            >
              Back
            </button> */}
            </div>
            </form>
            </section>
            </div>
  )
}

export default SkillForm
