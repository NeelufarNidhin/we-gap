import React from "react";
import { useGetEmployeesQuery } from "../API/employeeApi";
import employeeModel from "../Interfaces/employeeModel";

function EmployeeList() {
  const { data, isLoading, isSuccess, error } = useGetEmployeesQuery({});
  let content;

  if (isLoading) {
    content = <p>Loading ....</p>;
  } else if (error) {
    content = <p>Something went wrong</p>;
  } else if (isSuccess && data.result.length > 0) {
    content = data.result.map((employee : any) => {
      const {
        applicationUser: { firstName, email },
        state,
      } = employee;

      return (
     
        <div key={employee.id} className="bg-white shadow   rounded-lg p-4 my-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* Replace with actual employee image */}
              <img
                src={employee.imageName}
                alt="Employee"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">{firstName}</h3>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {state}
            </span>
          </div>
        </div>
        
      );
    });
  }

  return <div className=" container flex-grow mx-auto mt-8">{content}</div>;
}

export default EmployeeList;