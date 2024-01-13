import React, { useEffect, useState } from 'react'
import withAuthRole from '../HOC/withAuthRole'
// import { useGetAllUsersQuery } from '../API/userApi'
import axios from 'axios'
// import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

function AdminPanel () {

//const { data  } = useGetAllUsersQuery("");
const [ userDetail,setUserDetail] = useState<any[]>([]);

useEffect (()=> {
  let usertoken = localStorage.getItem("token")
  axios.get("http://localhost:8000/api/User/getall",
  {headers:{
    'Authorization':'bearer '  + usertoken
  }}).then((res) => 
  setUserDetail(res.data))
   
  });
  
  

  return (
    <div>
     <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-4 text-2xl font-semibold leadi dark:text-gray-500 ">User List</h2>
	<div className="overflow-x-auto">
		<table className="w-full p-6 text-xs text-left whitespace-nowrap">
			<colgroup>
				<col className="w-5"/>
				<col/>
				<col/>
				<col/>
				<col/>
				<col/>
				<col/>
			</colgroup>
			<thead>
				
        <tr className="dark:bg-gray-700">
					<th className="p-3">Id</th>
          <th className="p-3">Email</th>
					<th className="p-3">First Name</th>
					<th className="p-3">Last Name</th>
          <th className="p-3">Role</th>
          
					<th className="p-3">
						Edit
					</th>
				</tr>
			</thead>
			<tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
				
      { userDetail &&
      userDetail.map(item => (
        <tr key={item.id}>
					{/* <td className="px-3 text-2xl font-medium dark:text-gray-400">A</td> */}
					<td className="px-3 py-2">
						<p>{item.id}</p>
					</td>
					<td className="px-3 py-2">
						<span></span>
						<p className="dark:text-gray-400">{item.firstName}</p>
					</td>
					<td className="px-3 py-2">
						<p>{item.lastName}</p>
					</td>
					<td className="px-3 py-2">
						<p>{item.email}</p>
					</td>
					<td className="px-3 py-2">
						<p>{item.role}</p>
					</td>
          <td className="d-flex justify-content-around gap-1">
									{item.role !== "Admin" && (
										<button type="button" className="px-6 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
											// onClick={() =>
											// 	// handleDelete(user.id)
											// 	{ confirmAlert({
											// 		title: 'User Delete',
											// 		message: 'Are you sure to do this.',
											// 		buttons: [
											// 		  {
											// 			label: 'Yes',
											// 			// onClick: () => handleDelete(item.id)
											// 		  },
											// 		  {
											// 			label: 'No',
											// 			//onClick: () => alert('Click No')
											// 		  }
											// 		]
											//   });
											// }}
                      >
												
										
											Delete
										</button>
          
        )}
        <Link to={`/update/${item.id}`} className="w-100">
        <button type="button" className="px-6 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800">
          Edit</button>
          
									</Link>
								</td>
					</tr>
      ))}	
			</tbody>
			
		</table>
	</div>
</div>
    </div>
  )
}

export default withAuthRole(AdminPanel)
