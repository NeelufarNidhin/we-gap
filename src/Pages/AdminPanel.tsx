import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from '../API/userApi';
import { useBlockUserMutation, useDeleteUserMutation } from "../API/userApi";
import userModel from "../Interfaces/userModel";
import inputHelper from "../Helper/inputHelper";
import { SD_Roles } from "../Utility/SD";

const filterOptions = [
  "All",
  SD_Roles.ADMIN,
  SD_Roles.EMPLOYEE,
  SD_Roles.EMPLOYER
];
const pageSize = 5;

function AdminPanel() {
//Helllp
  const [filters, setFilters] = useState({ searchString: "", userRole: "" });
  const [apiFilters, setApiFilters] = useState({ searchString: "", userRole: "" });
  const [isUpdating,setIsUpdating] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const { data, isLoading, error, isSuccess } = useGetAllUsersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      userRole: apiFilters.userRole,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      userRole: filters.userRole
    });
  };
  
  const [blockUser] = useBlockUserMutation();
  //const [deleteUser] = useDeleteUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleUpdateUser = (id: any) => {
    const userToUpdate = data?.apiResponse.result.find((user: userModel) => user.id === id);
    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, isBlocked: !userToUpdate.isBlocked };
      blockUser(updatedUser)
        .unwrap()
        .then((response) => {
          setIsUpdating(false);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  useEffect(() => {
    if (data  && data.totalRecords) {
      const { TotalRecords } = JSON.parse(data?.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber} - ${Math.min(dataEndNumber, totalRecords)} of ${totalRecords}`;
  };

  const handlePaginationClick = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1
      });
    }
  };
  const handleClearAll = () => {
  
    setFilters({ searchString: "", userRole: "" });
    setApiFilters({ searchString: "", userRole: "" });
  };
  return (
    <div className="container p-2 mx-auto flex-grow sm:p-4 bg-violet-300 text-gray-900">
      <h2 className="mb-4 text-2xl font-semibold leading text-gray-500">User List</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="search"
          id="search-dropdown"
          className="flex-grow block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search..."
          name="searchString"
          value ={filters.searchString}
          onChange={handleChange}
        />
        <select className="p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" value={filters.userRole} name="userRole" onChange={handleChange}>
          {filterOptions.map((item, index) => (
            <option key={index} value={item === "All" ? "" : item}>{item}</option>
          ))}
        </select>
        <button className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleFilters}>Filter</button>
        <button className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleClearAll}>Clear All</button>
      </div>
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="border-b bg-violet-300 border-gray-700">
            {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
            {error && <tr><td colSpan={6}>Something went wrong</td></tr>}
            {isSuccess && data.apiResponse.result.map((item: userModel) => (
              <tr key={item.id}>
                <td className="px-3 py-2"><p>{item.id}</p></td>
                <td className="px-3 py-2"><span></span><p className="text-grey-600">{item.email}</p></td>
                <td className="px-3 py-2"><p>{item.firstName}</p></td>
                <td className="px-3 py-2"><p>{item.lastName}</p></td>
                <td className="px-3 py-2"><p>{item.role}</p></td>
                <td className="px-3 py-2">
                  <button onClick={() => handleUpdateUser(item.id)} className={item.isBlocked ? "bg-red-500" : "bg-green-500"}>
                    {item.isBlocked ? "Unblock User" : "Block User"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-4">
        <div>Rows per page</div>
        <div>
          <select className="mx-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handlePaginationClick("change", Number(e.target.value));
            setCurrentPageSize(Number(e.target.value));
          }} value={currentPageSize}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div className="mx-2">{getPageDetails()}</div>
        <button className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" disabled={pageOptions.pageNumber === 1} onClick={() => handlePaginationClick("prev")}>
          Previous
        </button>
        <button className="px-4 py-2 bg-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords} onClick={() => handlePaginationClick("next")}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
