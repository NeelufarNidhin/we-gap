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
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  //const[error,setError] = useState("")
  const handleRoleSelection = (role: any) => {
    setSelectedRole(role);
  };
  const validatePassword = (password:any) => {
    const hasMinimumLength = password.length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasMinimumLength && hasCapitalLetter && hasSpecialCharacter && hasNumber;
  };
  const handlePasswordChange = (e :any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const validateName = (name : string) => {
    return /^[a-zA-Z]+$/.test(name);
  };


  const handleFirstNameChange = (e  : any) => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);
    if (!validateName(newFirstName)) {
      setFirstNameError("First name must not contain spaces, special characters, or numbers.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e : any) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    if (!validateName(newLastName)) {
      setLastNameError("Last name must not contain spaces, special characters, or numbers.");
    } else {
      setLastNameError("");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!validateName(firstName)) {
      setFirstNameError("First name must not contain spaces, special characters, or numbers.");
      setLoading(false);
      return;
    }

    if (!validateName(lastName)) {
      setLastNameError("Last name must not contain spaces, special characters, or numbers.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Reset confirm password error if they match
    setConfirmPasswordError("");

    const response: apiResponse = await registerUser({
      firstName: firstName,
      lastName: lastName,
      password: password,
      userName: email,
      role: selectedRole,
    });

    console.log(response);
    if (response.data && response.data.isSuccess) {
      ToastNotify("User Registration done ,Otp send to your mail id, ");
      console.log(response.data.result);
      navigate(`/Otp/${email}`);
    } else if (response.error) {
      console.log(response.error);
      ToastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };
  return (
    <div className="container flex-grow flex flex-col mx-auto mt-8 items-center  py-6  text-violet-800">
      <div className="text-center p-4 space-y-4 ">
        <h1 className="text-5xl font-bold ">Sign up now</h1>
        <p className="text-xl font-medium ">Get started your journey with us</p>
      </div>
      <div className="flex  space-x-4 mt-4">
        <button
          className=" px-8 py-3 font-semibold rounded-md bg-violet-600 text-white"
          onClick={() => handleRoleSelection("employee")}
        >
          Employee{" "}
        </button>
        <button
          className=" px-8 py-3 font-semibold rounded-md bg-violet-600 text-white"
          onClick={() => handleRoleSelection("employer")}
        >
          Employer{" "}
        </button>
      </div>

      {selectedRole && (
        <div className="w-full max-w-sm mt-8 bg-violet-900 text-gray-100 p-6 rounded-md">
          <div className="mb-6 text-center">
            <h1 className=" text-4xl font-bold">Sign Up</h1>
            <p className="text-sm">Sign up to create your account</p>
          </div>
          <form method="post" onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm">
                First Name
              </label>

              <input
                type="firstName"
                name="firstName"
                id="firstName"
                placeholder="Leroy"
                required
                onChange={handleFirstNameChange
                }
                value={firstName}
                //  value={userInput.password}
                //  onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
              {firstNameError && (
                <p className="text-red-500 text-xs mt-1">{firstNameError}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm">
                Last Name
              </label>

              <input
                type="lastName"
                name="lastName"
                id="lastName"
                placeholder="Roy"
                required
                onChange={handleLastNameChange}
                value={lastName}
                //  value={userInput.password}
                //  onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
              {lastNameError && (
                <p className="text-red-500 text-xs mt-1">{lastNameError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <Link
                      rel="noopener noreferrer"
                      to="/ForgotPassword"
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      Forgot password?
                    </Link>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                onChange={handlePasswordChange}
                value={password}
                //  value={userInput.password}
                //  onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
              {!passwordValid && (
        <p className="text-red-500 mt-2">
          Password must contain min 8 character, a capital letter, a special character, and a number.
        </p>
      )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="*****"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-700"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
