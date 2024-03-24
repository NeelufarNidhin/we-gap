import React, { useState } from 'react'
import { useCreateSkillMutation } from '../API/skillApi';
import apiResponse from '../Interfaces/apiResponse';
import { useParams } from 'react-router-dom';

function SkillForm() {
    const {id} = useParams()
    const [skillName,setSkillName] = useState("");
    const [addSkill] = useCreateSkillMutation()
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
       
       setSkillName(e.target.value)
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        const response :apiResponse = await addSkill(
            {skillName : skillName,
            employeeId : id
        }
        )
        console.log(response.data);
        setSkillName("")
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
					<input id="skillName" type="text" placeholder="Skill" required  value={skillName} name='skillName' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
            </div>
            </fieldset>
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
              >
               Submit
              </button>
            </div>
            </form>
            </section>
            </div>
  )
}

export default SkillForm
