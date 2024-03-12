import React, { useEffect, useState } from "react";
import withAdminRole from "../HOC/withAdminRole";
// import { useGetAllUsersQuery } from '../API/userApi'
import axios from "axios";
// import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";
import { useBlockUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "../API/userApi";

function AdminPanel() {
  //const { data  } = useGetAllUsersQuery("");
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const [userDetail, setUserDetail] = useState<any[]>([]);
  const [deleteUser] = useDeleteUserMutation()
  const [blockUser] = useBlockUserMutation()
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
  

  const handleUpdateUser = (id:string) => {
     // Toggle user's block status
     const updatedUser = userDetail.find((user) => user.id === id);
     updatedUser.isBlocked = !updatedUser.isBlocked;
 
     // Send update request to the server
     blockUser(updatedUser)
       .unwrap()
       .then((response) => {
         console.log("User Blocked successfully:", response);
         if(response)
         // Toggle updating state
         setIsUpdating(false);
       })
       .catch((error) => {
         console.error("Error updating user:", error);
       });
  };

  // //const [values ,setValues] = useState(initialValues);
  // const handleInputChange = (e : any) => {
	// 	const {name , value} = e.target;
	// 	setValues ({
	// 		...values,
	// 		[name] : value
	// 	})
	// }

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
                {/* <th className="p-3">Actions</th> */}
			
			
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
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleUpdateUser(item.id)}
                        className={item.isBlocked ? "bg-red-500" : "bg-green-500"}
                      >
                        {item.isBlocked ? "Unblock User" : "Block User"}
                      </button>
                    </td>

                    <td className="d-flex justify-content-around gap-1">
                      
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
