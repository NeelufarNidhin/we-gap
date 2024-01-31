import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { useOtpLoginUserMutation } from '../API/auth';
import apiResponse from '../Interfaces/apiResponse';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import userModel from '../Interfaces/userModel';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';


function OTP() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [otpLoginUser] = useOtpLoginUserMutation();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const[error,setError] = useState(null);
   
    const handleSubmit = async (e: any) => {
        e.preventDefault();
       
        setLoading(true);
        console.log(otp,email)
    

        const response: apiResponse = await otpLoginUser(
          {Otp: otp,
            Email: email}
        );
    //  if(response.data?.errorMessages){
    //   setError(response.data?.errorMessages?);
    //  }
        if (response.data) {
            
           // const { token } = response.data.result;
            if(response.data.isSuccess ){
              console.log(response.data.isSuccess);
               const { token } = response.data.result;
      const { id, firstName, email, role }: userModel = jwtDecode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ id, firstName, email, role }));
          
           
      
          switch (role) {
            case "employee":
              const isEmployeeFormFilled = true; 
              if (isEmployeeFormFilled) {
                  navigate("/EmployeeForm");
              } else {
                  navigate("/EmployeeProfile");
              }
              break;
            case "employer":
              navigate("/Employer");
              break;
            case "admin":
              navigate("/AdminPanel");
              break;
            default:
              // Handle any unexpected roles
              console.error("Unexpected role:", role);
              navigate("/"); // Redirect to default page as a fallback
          }
        } else if (response.error) {
          console.log(response.error);
        }
      
        setLoading(false);
          };
        }
       
  return (

      <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-violet-900 text-gray-100 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-400">
           Please Verify OTP
          </p>
          {error && <p className='text-red-300'>{error}</p>}
        </div>
        <form method="post" onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Otp
                </label>
                
              </div>
              <input
                type="password"
                name="otp"
                id="otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                value={otp}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
               Email
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
          </div>
          <div className="space-y-2">
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

  )
              }

export default OTP
