import React, { useEffect, useState } from "react";
import defaultImageSrc from "../Assets/Images/profil-pic2.jpeg";

import { useCreateEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../API/employeeApi";
import apiResponse from "../Interfaces/apiResponse";
import ToastNotify from "../Helper/ToastNotify";
import { useNavigate, useParams } from "react-router-dom";
import userModel from "../Interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import inputHelper from "../Helper/inputHelper";


//const defaultImageSrc = "../"

function EmployeeForm(empId:any ) {
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
    
  };

  const [values, setValues] = useState(initialValues);
  //const [error, setErrors] = useState({});
  const [imageToStore,setImageToStore] = useState<any>();
  const [imageToDisplay,setImageToDisplay] = useState<string>(defaultImageSrc);
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [createEmployee] = useCreateEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>  | React.ChangeEvent<HTMLSelectElement>) => {
    const tempData = inputHelper(e,values);
    setValues(tempData);
   
  };
  const {id}= useParams();

  const {employeeId} = useParams();
  const {data,isLoading } = useGetEmployeeByIdQuery(employeeId);
  //const {employeeId}= useParams();

useEffect(() => {
if(!isLoading && data && data.result) {
  console.log(data.result)
  const tempData = {
   
    firstName : userData.firstName,
    lastName : userData.lastName,
   email : userData.email,
    dob: data.result.dob,
    gender : data.result.gender,
    address : data.result.address,
    state : data.result.state,
    city : data.result.city,
    pincode : data.result.pincode,
    mobileNumber : data.result.mobileNumber,
    bio : data.result.bio,
    applicationUserId : data.result.applicationUserId
  };
  setValues(tempData);
  setImageToDisplay(data.result.imageName)
}
},[data,isLoading,userData])

  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ;

      if(file){
        const imgType = file.type.split("/")[1];
        const validImgTypes = ["jpg","jpeg","png"];
        const isImageTypeValid = validImgTypes.filter((e) =>{
          return e === imgType;
        });

        if(file.size > 1000 * 1024){
          setImageToStore("")
          ToastNotify("file must be less than 1 MB");
          return ;
        }

        else if(isImageTypeValid.length === 0){
          setImageToStore("")
          ToastNotify("file must be in jpg,jpeg or png format" ,"error");
          return;
        }
        const reader =  new FileReader();
        reader.readAsDataURL(file);
        setImageToStore(file);
        reader.onload = (e) =>{
          const imgUrl = e.target?.result as string;
          setImageToDisplay(imgUrl);
        }

      }
    }

  //const [isFilled, setIsFilled] = useState(false); // state to check if the form is filled
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!imageToStore && !id){
      ToastNotify("please upload an image")
      return;
    }

    const formData = new FormData();
    formData.append("ApplicationUserId",userData.id);
    formData.append("DOB",values.dob);
    formData.append("Gender",values.gender);
    formData.append("Address",values.address);
    formData.append("State",values.state);
    formData.append("City",values.city);
    formData.append("Pincode",values.pincode);
    formData.append("MobileNumber",values.mobileNumber);
    formData.append("Bio",values.bio);
    if(imageToDisplay) formData.append("Imagefile",imageToStore);
   
    let response :apiResponse | any 
    if(employeeId){
      formData.append("Id", employeeId);
      response = await updateEmployee(formData)
      if (response.data ){
        setValues(initialValues)
         console.log(response.data);
         navigate(`/EmployeeProfile/${response.data.result.id}`);
       }
       else if (response.error || !response.data?.isSuccess) {
         console.log(response.error)
         ToastNotify(response.error.data.errorMessages[0],"error");
       }
    }
    else{
     response = await createEmployee(formData);
    
   

    if (response.data ){
     setValues(initialValues)
      console.log(response.data);
      navigate(`/EmployeeProfile/${response.data.result.id}`);
    }
    else if (response.error || !response.data?.isSuccess) {
      console.log(response.error)
      ToastNotify(response.error.data.errorMessages[0],"error");
    }
  };
  }
  return (
    <div>
      <section className="p-6 bg-violet-300 text-gray-900">
        <form
          method="post"
          encType="multipart/form-data"
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
                  required
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
                  required
                  placeholder=""
                  value={values.city}
                  name="city"
                  onChange={handleInputChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm">
                  State 
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder=""
                  value={values.state}
                  required
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
                  src={imageToDisplay}
                  alt=""
                  className="w-20 h-20 rounded-full  bg-gray-300"
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
            onClick={() =>navigate(-1) }
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
