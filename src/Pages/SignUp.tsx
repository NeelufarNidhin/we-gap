import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../API/auth";
import apiResponse from "../Interfaces/apiResponse";
import ToastNotify from "../Helper/ToastNotify";


function SignUp() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const handleRoleSelection = (role: any) => {
    setSelectedRole(role);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      firstName: firstName,
      lastName: lastName,
      password: password,
      userName: email,
      role: selectedRole,
    });
    console.log(selectedRole, email);
    console.log(response.data);
    if (response.data) {
     ToastNotify("User Registration done , Please sign in to continue");
     navigate("/Login");
    } else if (response.error) {
      const errMsg = 
      ToastNotify(response.error,"error");
    }

    setLoading(false);
  };
  return (
    <div>
      <div className="py-6 dark:bg-gray-400 dark:text-gray-50">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leadi text-center">Sign up now</h1>
          <p className="text-xl font-medium text-center">
            Get Started with your journey with us
          </p>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
            {/* <Link to="/EmployeeSignUp" className="btn btn-dark">I am Employee</Link>
    <Link to="/EmployerSignUp" className="btn btn-dark">I am Employer</Link> */}

            <button onClick={() => handleRoleSelection("employee")}>
              Employee{" "}
            </button>
            <button onClick={() => handleRoleSelection("employer")}>
              Employer{" "}
            </button>
          </div>
        </div>
      </div>
      {selectedRole && (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm dark:text-gray-400">
              SignUp to create your account
            </p>
          </div>
          <form method="post" onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="firstName" className="text-sm">
                    First Name
                  </label>
                </div>
                <input
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  placeholder="Leroy"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                  //  value={userInput.password}
                  //  onChange={handleUserInput}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="lastName" className="text-sm">
                    Last Name
                  </label>
                </div>
                <input
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  placeholder="Roy"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                  //  value={userInput.password}
                  //  onChange={handleUserInput}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    className="text-xs hover:underline dark:text-gray-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  //  value={userInput.password}
                  //  onChange={handleUserInput}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
                >
                  Sign Up
                </button>
              </div>
              {/* <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
				<a rel="noopener noreferrer" href="#" className="hover:underline dark:text-violet-400">Sign up</a>.
			</p> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
