import React, { useState } from 'react'

function JobSkillForm() {
  const  [skill,setSkill] = useState("")
  const handleInputChange = (e : any) => {
   
    setSkill ( e.target)}
       
 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // const response: apiResponse = await addExperience({
    // })
  }
  return (
    <div>
      <form method="post" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add Experience</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="currentJobTitle" className="text-sm">Current Job Title </label>
					<input id="currentJobTitle" type="text" placeholder="Title"  value="" name='currentJobTitle' onChange={handleInputChange}
					 className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                </div>
                </fieldset>
                </form>
    </div>
  )
}

export default JobSkillForm
