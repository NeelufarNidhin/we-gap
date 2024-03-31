import  {  useState } from "react";
import { useGetAllUsersQuery } from '../API/userApi'
import { useBlockUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "../API/userApi";
import userModel from "../Interfaces/userModel";


function AdminPanel() {
  const { data, isLoading,error,isSuccess } = useGetAllUsersQuery({});
 
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });

 
  const [deleteUser] = useDeleteUserMutation()
  const [blockUser] = useBlockUserMutation()
  const [isUpdating,setIsUpdating] = useState(false)



  const handleUpdateUser = (id:string) => {
     
     const userToUpdate = data.result.find((user :userModel) => user.id === id);
  if (userToUpdate) {
   
    const updatedUser = { ...userToUpdate, isBlocked: !userToUpdate.isBlocked };
 
    
     blockUser(updatedUser)
       .unwrap()
       .then((response) => {
        //ToastNotify("User Blocked successfully:", response);
         if(response)
       
         setIsUpdating(false);
       })
       .catch((error) => {
         console.error("Error updating user:", error);
       });
      }
  };

 

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
            {/* {data && !isLoading && data.result && Array.isArray(data.result.result) && (
                data.result.result.map((item: userModel) => ( */}
                {isLoading && <h2>...Loading</h2>}
                {error && <h2>Something went wrong</h2>}
                {isSuccess && (
                  data.result.map((item : userModel) =>(
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
                  ))
                )}
                  
                {/* )))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
