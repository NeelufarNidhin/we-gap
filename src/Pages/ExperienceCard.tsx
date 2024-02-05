import React from 'react'
import experienceModel from '../Interfaces/experienceModel'

interface Props {
    experienceItem : experienceModel
}
function ExperienceCard(props:Props) {


  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="currentJobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    id="currentJobTitle"
                    name="currentJobTitle"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Enter job title"
                    value={props.experienceItem.currentJobTitle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="isWorking" className="block text-sm font-medium text-gray-700">Is Working</label>
                <input
                    type="text"
                    id="isWorking"
                    name="isWorking"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Is working?"
                    value={props.experienceItem.isWorking}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Enter description"
                    value={props.experienceItem.description}
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="starting_Date" className="block text-sm font-medium text-gray-700">Starting Date</label>
                <input
                    type="date"
                    id="starting_Date"
                    name="starting_Date"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    // value={props.experienceItem.starting_Date}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">Completion Date</label>
                <input
                    type="date"
                    id="completionDate"
                    name="completionDate"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    // value={props.experienceItem.completionDate}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Enter company name"
                    value={props.experienceItem.companyName}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Enter employee ID"
                    value={props.experienceItem.employeeId}
                />
            </div>
        </div>
    </div>
  )
}

export default ExperienceCard
