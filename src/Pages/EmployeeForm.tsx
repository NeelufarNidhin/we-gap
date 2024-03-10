import React, { useState } from "react";
import defaultImageSrc from "../Assets/Images/profil-pic2.jpeg";
import withAuthRole from "../HOC/withAdminRole";
import { useCreateEmployeeMutation } from "../API/employeeApi";
import apiResponse from "../Interfaces/apiResponse";
import ToastNotify from "../Helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import EmployeeProfile from "./EmployeeProfile";

//const defaultImageSrc = "../Images/profil-pi2.jpeg"

function EmployeeForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    mobileNumber: "",
    bio: "",
    imageName: "",
    imageSrc: defaultImageSrc,
    imageFile: null,
  };

  const [values, setValues] = useState(initialValues);
  const [error, setErrors] = useState({});
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [createEmployee] = useCreateEmployeeMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x: any) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  //const [isFilled, setIsFilled] = useState(false); // state to check if the form is filled
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response: apiResponse = await createEmployee({
      applicationUserId: userData.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: values.dob,
      gender: values.gender,
      address: values.address,
      state: values.state,
      city: values.city,
      pincode: values.pincode,
      bio: values.bio,
      imageName: values.imageName,
    });
 
    console.log(response.data);
  
    if (response.data) {
      setValues(initialValues)

      navigate(`/EmployerProfile/${response.data.id}`);
    }
  };

  return (
    <div>
      <section className="p-6 bg-violet-300 text-gray-900">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="dob" className="text-sm">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  placeholder="dob"
                  value={values.dob}
                  name="dob"
                  onChange={handleInputChange}
                  className=" w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-90"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
    <label htmlFor="gender" className="text-sm">
        Gender
    </label>
    <select
        id="gender"
        name="gender"
        value={values.gender}
        onChange={handleInputChange}
        className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-500"
    >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
</div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="mobileNumber" className="text-sm">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  type="mobileNumber"
                  placeholder="mobileNumber"
                  value={values.mobileNumber}
                  name="mobileNumber"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder=""
                  value={values.address}
                  name="address"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder=""
                  value={values.city}
                  name="city"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm">
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder=""
                  value={values.state}
                  name="state"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="pincode" className="text-sm">
                  Pincode{" "}
                </label>
                <input
                  id="pincode"
                  type="text"
                  placeholder=""
                  value={values.pincode}
                  name="pincode"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-violet-100">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Profile</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Bio
                </label>
                {/* <textarea */}
                <input
                  id="bio"
                  placeholder=""
                  value={values.bio}
                  name="bio"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                
                  ></input>
                {/* </textarea> */}
              </div>
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Photo
                </label>
                <img
                  src={values.imageSrc}
                  alt=""
                  className="w-20 h-20 rounded-full bg-gray-500 bg-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="Images/*"
                    onChange={showPreview}
                  ></input>
                  {/* <button type="button" className="px-4 py-2 border rounded-md border-gray-800">Change</button> */}
                </div>
              </div>
            </div>
          </fieldset>
          <div className="">
            <button
              type="submit"
             
              className="float-right mx-2 w-100 px-8 py-3 font-semibold rounded-md bg-violet-500 text-white "
            >
              Next
            </button>
            <button
            
              className="float-right w-100 px-8 py-3 font-semibold rounded-md bg-violet-500 text-white "
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
//}

export default EmployeeForm;
