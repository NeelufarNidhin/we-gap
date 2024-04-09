import React from "react";
import { useGetEmployeesQuery } from "../API/employeeApi";

function EmployeeList() {
  const { data, isLoading, isSuccess,  error } = useGetEmployeesQuery(
    {}
  );
  let content;
  if (isLoading) {
    content = <p>Loading ....</p>;
  } 
  else if (error){
    content = <p> Something went wrong</p>
  }
  else if (isSuccess && data.result.length > 0) {
    content = data.result.map((employee: any) => {
      return (
        <div className="m-5">
          <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
            <button
             
              className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
            >
              <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                {/* <img
                  src="/images/EC25KRDBo-K3w8GexNHSE.png"
                  alt=""
                  className="h-full w-full object-cover text-gray-700"
                /> */}
              </div>
            </button>
            <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
              <h3 className="text-sm text-gray-600">{employee.applicationUser.firstName}</h3>
              <button
                
                className="mb-3 overflow-hidden pr-7   text-lg font-semibold sm:text-xl"
              >
                {" "}
               {employee.applicationUser.email}{" "}
              </button>
              <p className="overflow-hidden pr-7 text-sm">
                
              </p>

              <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="">
                 
                  <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                    {" "}
                   {employee.state}{" "}
                  </span>
                </div>
                <div className="">
                 
                  <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                  
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return <div>{content}</div>;
  
}

export default EmployeeList;
