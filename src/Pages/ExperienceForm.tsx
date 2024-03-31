import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiResponse from "../Interfaces/apiResponse";
import {
  useAddExperienceMutation,
  useGetExperienceByIdQuery,
  useUpdateExperienceMutation,
} from "../API/experienceApi";

import ToastNotify from "../Helper/ToastNotify";
import inputHelper from "../Helper/inputHelper";

function ExperienceForm(expId: any) {
  const initialValues = {
    currentJobTitle: "",
    isWorking: "",
    description: "",
    starting_Date: "",
    completionDate: "",
    companyName: "",
    employeeId: "",
  };

  const { experienceId } = useParams();

  const [values, setValues] = useState(initialValues);
  const { data, isLoading, isError } = useGetExperienceByIdQuery(experienceId);

  useEffect(() => {
    if (!isLoading && data && data.result) {
      console.log(data.result);
      const tempData = {
        currentJobTitle: data.result.currentJobTitle,
        isWorking: data.result.isWorking,
        description: data.result.description,
        starting_Date: data.result.starting_Date,
        completionDate: data.result.completionDate,
        companyName: data.result.companyName,
        employeeId: data.result.employeeId,
      };
      setValues(tempData);
    }
  }, [data]);

  const navigate = useNavigate();
  const {id} = useParams();
  const [addExperience] = useAddExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, values);
    setValues(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response: apiResponse;
    if (experienceId) {
      response = await updateExperience({
        id: experienceId,
        currentJobTitle: values.currentJobTitle,
        isWorking: values.isWorking,
        description: values.description,
        starting_Date: values.starting_Date,
        completionDate: values.completionDate,
        companyName: values.companyName,
        employeeId: values.employeeId,
      });

     // ToastNotify("Data Updated SuccessFully")
    } else {
      response = await addExperience({
        currentJobTitle: values.currentJobTitle,
        isWorking: values.isWorking,
        description: values.description,
        starting_Date: values.starting_Date,
        completionDate: values.completionDate,
        companyName: values.companyName,
        employeeId: id,
      });
    //  ToastNotify("Data Added SuccessFully")
    }
    if (response.data && response.data.isSuccess) {
      console.log(response.data.result);

      setValues({
        currentJobTitle: "",
        isWorking: "",
        description: "",
        starting_Date: "",
        completionDate: "",
        companyName: "",
        employeeId: "",
      });
     
    } else if (response.error && !response.data?.isSuccess) {
      console.log(response.error);
      ToastNotify(response.error?.data?.errorMessages[0], "error");
    }
    
  };
  return (
    <div>
      <section className="p-6 bg-violet-300 text-gray-900">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Add Experience</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="currentJobTitle" className="text-sm">
                  Current Job Title{" "}
                </label>
                <input
                  id="currentJobTitle"
                  type="text"
                  placeholder="Title"
                  required
                  value={values.currentJobTitle}
                  name="currentJobTitle"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              {/* <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"> */}
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="companyName" className="text-sm">
                  Company Name{" "}
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Company name"
                  required
                  value={values.companyName}
                  name="companyName"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="isWorking" className="text-sm">
                  Current Work Status{" "}
                </label>
                <input
                  id="isWorking"
                  type="text"
                  placeholder="Status"
                  required
                  value={values.isWorking}
                  name="isWorking"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              {/* </div> */}
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  placeholder=""
                  value={values.description}
                  name="description"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <label htmlFor="starting_Date" className="text-sm">
                  Start Date
                </label>
                <input
                  id="starting_Date"
                  type="date"
                  placeholder=""
                  value={values.starting_Date}
                  name="starting_Date"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="completionDate" className="text-sm">
                  Completion Date
                </label>
                <input
                  id="completionDate"
                  type="date"
                  placeholder=""
                  value={values.completionDate}
                  name="completionDate"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
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
  );
}

export default ExperienceForm;
