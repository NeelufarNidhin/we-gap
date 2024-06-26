import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../API/auth";
import apiResponse from "../Interfaces/apiResponse";
import ToastNotify from "../Helper/ToastNotify";

import userModel from "../Interfaces/userModel";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";

import Loader from "../Components/Loader";
import { login } from "../Storage/Redux/authSlice";



function Login() {
 const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg ,setErrMsg] = useState("");

  useEffect(()=>{
  //  setErrMsg('')
  },[email,password])
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    setLoading(true);
   
    const response: apiResponse = await loginUser({
      email: email,
      password: password,
    });
    if (response.data && response.data.isSuccess) {
      
      const { token } = response.data.result;
      const { id, firstName, email, role }: userModel = jwtDecode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ id, firstName, email, role }));
      
      switch (role) {
        case "employer":
         
          navigate("/Employer");

          break;
        case "employee":
        
          navigate("/Employee");
          break;
        case "admin":
          navigate("/AdminPanel");
          break;
        default:
          // Handle any unexpected roles
          console.error("Unexpected role:", role);
          navigate("/"); 
      }
    } else if (response.error ) {
      setErrMsg(response.error.data.errorMessages[0])
     
    // ToastNotify(response.error.data.errorMessages[0],"error");
   // ToastNotify(response.error,"error");
    } 
    setLoading(false)
}

  
  return (
    <div className="h-screen flex items-center justify-center">
      {loading && <Loader/>}
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-violet-900 text-gray-100 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-400">
            Sign in to access your account
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
                placeholder="E-Mail"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link
                  rel="noopener noreferrer"
                  to="/ForgotPassword"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-red-500">{errorMsg}</p>
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-white">
              Don't have an account yet?
              <Link
                rel="noopener noreferrer"
                to="/SignUp"
                className="hover:underline text-violet-400"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
