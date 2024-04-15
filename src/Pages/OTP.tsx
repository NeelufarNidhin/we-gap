import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useOtpLoginUserMutation, useResendOtpMutation } from "../API/auth";
import apiResponse from "../Interfaces/apiResponse";

import ToastNotify from "../Helper/ToastNotify";

function OTP() {
  //const [email, setEmail] = useState("");
 const {email} = useParams();
  const navigate = useNavigate();
  const [otpLoginUser] = useOtpLoginUserMutation();
  const [otpResend] = useResendOtpMutation();

  const [otp, setOtp] = useState("");
 const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Timer duration in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  //const[error,setError] = useState(null);

  useEffect(() => {
    let interval:any
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleResendOTP =async (e: any) => {
    e.preventDefault();
    //  resend OTP 
    // { !email && ToastNotify("Email required") }
    const response: apiResponse = await otpResend({
      Email: email,
    });
    if(response.data){
      console.log(response.data)
    
    setTimer(60); // Reset the timer
    setIsTimerRunning(true);
    } 
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const response: apiResponse = await otpLoginUser({
      Otp: otp,
     
    });
   
    if (response.data && response.data.isSuccess) {
      
        console.log(response.data.isSuccess);
        navigate("/Login");
        ToastNotify("Please Login to continue");
      } else if (response.error || !response.data?.isSuccess) {
        console.log(response.error)
        ToastNotify(response.error.data.errorMessages[0],"error");
      }
      setLoading(false);
    
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-violet-900 text-gray-100 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">OTP Verification</h1>
          <p className="text-sm dark:text-gray-400">Please Verify OTP</p>
          {/* {error && <p className='text-red-300'>{error}</p>} */}
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
            {/* <div>
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
            </div>  */}
            <div>
                {!isTimerRunning && (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-violet-400 focus:outline-none"
                  >
                    Resend OTP
                  </button>
                  
                )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
            {isTimerRunning &&
              <p>Time Remaining :{timer}</p>
           
            }
             </div>
             
            <div>
            <div>
            {/* {!email &&
             <span className="text-red-300">Email is required!!! </span>
           
            } */}
            
             </div>
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

export default OTP;
