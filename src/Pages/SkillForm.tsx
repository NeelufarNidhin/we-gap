import React, { useEffect, useState } from 'react'
import { useCreateSkillMutation, useGetSkillByIdQuery, useUpdateSkillMutation } from '../API/skillApi';
import apiResponse from '../Interfaces/apiResponse';
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotify from '../Helper/ToastNotify';
import inputHelper from '../Helper/inputHelper';

function SkillForm(skillid : any) {

  const initialValues = {
    skillName : "",
    employeeId:""
  }
    const {id} = useParams()
   // const [skillName,setSkillName] = useState("");
   const [values ,setValues] = useState(initialValues);
    const [addSkill] = useCreateSkillMutation()

    const {skillId} = useParams()
    const {data,isLoading,isError} = useGetSkillByIdQuery(skillId)
    const navigate = useNavigate();
    useEffect(() => {
      if(!isLoading && data && data.result){
        console.log(data.result)
        const tempData = {
          skillName : data.result.skillName,
          employeeId : data.result.employeeId
        }
        setValues(tempData)
      }

    },[data])

    const [updateSkill] = useUpdateSkillMutation();
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const tempData = inputHelper(e,values);
      setValues(tempData);
      // setSkillName(e.target.value)
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
       let response :apiResponse ;
        if(skillId) {
          response = await  updateSkill({
            id :skillId,
            skillName : values.skillName,
            employeeId : values.employeeId
          })
        }
        else {
       response = await addSkill(
            {skillName : values.skillName,
            employeeId : id
        }
      
        )
      }
         if (response.data && response.data.isSuccess){
          console.log(response.data.result);
         setValues({skillName : "",
        employeeId : ""})
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
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="skillName" className="text-sm">Skill </label>
					<input id="skillName" type="text" placeholder="Skill" required  value={values.skillName} name='skillName' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
            </div>
            </fieldset>
            <div className="flex justify-between">
            <button
              type="submit"
              className="w-full px-8 mx-4 py-3 font-semibold rounded-md bg-violet-400 text-white"
            >
              Submit
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full px-8 py-3  mx-4 font-semibold rounded-md bg-violet-400 text-white"
            >
              Back
            </button>
            </div>
            </form>
            </section>
            </div>
  )
}

export default SkillForm
