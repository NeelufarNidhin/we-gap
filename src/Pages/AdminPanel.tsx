import React, { useEffect, useState } from "react";
import withAdminRole from "../HOC/withAdminRole";
// import { useGetAllUsersQuery } from '../API/userApi'
import axios from "axios";
// import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";
import { useDeleteUserMutation, useUpdateUserMutation } from "../API/userApi";

function AdminPanel() {
  //const { data  } = useGetAllUsersQuery("");

  const [userDetail, setUserDetail] = useState<any[]>([]);
  const [deleteUser] = useDeleteUserMutation()
  // const [updateUser] = useUpdateUserMutation()
  const [isUpdating,setIsUpdating] = useState(false)
  useEffect(() => {
    let usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/User/getall", {
        headers: {
          Authorization: "bearer " + usertoken,
        },
      })
      .then((res) => setUserDetail(res.data));
  });
  

  // const handleUpdateUser = (id) => {
  //   // Implement update user logic
  //   // You may navigate to a different page/component for updating user details
  // };
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 bg-violet-300 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leadi text-gray-500 ">
          User List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <colgroup>
              <col className="w-5" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="bg-violet-200">
                <th className="p-3">Id</th>
                <th className="p-3">Email</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Role</th>
                {/* <th className="p-3"></th> */}
                <th className="p-3">Actions</th>
			
			
              </tr>
            </thead>
            <tbody className="border-b bg-violet-300 border-gray-700">
              {userDetail &&
                userDetail.map((item) => (
                  <tr key={item.id}>
                    {/* <td className="px-3 text-2xl font-medium dark:text-gray-400">A</td> */}
                    <td className="px-3 py-2">
                      <p>{item.id}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span></span>
                      <p className="text-grey-600">{item.email}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{item.firstName}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{item.lastName}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{item.role}</p>
                    </td>
                    {/* <td className="d-flex justify-content-around gap-1">
                      
                    </td> */}

                    <td className="d-flex justify-content-around gap-1">
                      {/* <button
                      onClick={()=>{
                        setIsUpdating(!isUpdating)
                      }}
                       
                        className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Update
                        {isUpdating ? 'Cancel' : 'Edit'}
                      </button>
                      {isUpdating ? <button className="items-center py-2 px-4 m-1 bg-gray-400 text-black" onClick={() => handleUpdateUser({id:item.id})} >Update</button> : ""} */}
                      <button
                        onClick={() =>()=> deleteUser({id:item.id})}
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAdminRole(AdminPanel);
