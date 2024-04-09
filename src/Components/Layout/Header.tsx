
import { Link, useNavigate } from "react-router-dom";
import userModel from "../../Interfaces/userModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  
  return (
    <header className="p-4 bg-violet-100 text-violet-800">
      <div className="container flex justify-between h-16 mx-auto">
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              to="/"
              aria-label="Back to homepage"
              className="flex items-center p-2 text-xl font-bold"
            >
              We-GAP
            </Link>
          </li>

         { (userData.role === "admin" ) && (
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              to="/AdminPanel"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
             Users
            </Link>
            <Link
              rel="noopener noreferrer"
              to="/JobSkill"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
             JobSkills
            </Link>
            <Link
              rel="noopener noreferrer"
              to="/JobType"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
            JobTypes
            </Link>
          </li>
     )}
      { (userData.role === "employer" ) && (
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              to="/Employer"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
             Profile
            </Link>
            <Link
              rel="noopener noreferrer"
              to="/EmployeeList"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
             Employees
            </Link>
          </li>
          
     )}
      { (userData.role === "employee" ) && (
        <>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              to="/Employee"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
            >
            Profile
            </Link>
          </li>
           <li className="flex">
           <Link
             rel="noopener noreferrer"
             to="/JobList"
             className="flex items-center px-4 -mb-1 border-b-2 border-transparent  "
           >
           Jobs
           </Link>
         </li>
         </>
     )}
                 
        </ul> 

        <div className="flex items-center md:space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              {/* <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-gray-800"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button> */}
            </span>
            {/* <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-violet-150 text-white-900 focus:bg-gray-100"
            /> */}
          </div>
          {/* <button type="button" className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900">Log in</button> */}
        </div>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          {userData.id ? (
            <>
              <li className="flex">
                <button
                  type="button"
                  className="px-8 py-3 font-semibold rounded bg-violet-800 text-gray-100"
                >
                  Welcome , {userData.firstName}
                </button>
              </li>
              <li className="flex">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-8 py-3 font-semibold rounded bg-violet-800 text-gray-100"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="flex">
                <Link
                  rel="noopener noreferrer"
                  to="/Login"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                >
                  Login
                </Link>
              </li>
              <li className="flex">
                <Link
                  rel="noopener noreferrer"
                  to="/SignUp"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
