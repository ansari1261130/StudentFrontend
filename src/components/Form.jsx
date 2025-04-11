import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        id: data.id,
        name: data.name,
        phone_number: data.phonenumber, // Fix field name
        email: data.email,
        gender: data.gender.toLowerCase(), // Ensure lowercase
      };
  
      const response = await fetch("http://127.0.0.1:8000/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
      } else {
        alert("Error: " + JSON.stringify(result));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Id Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">ID</label>
            <input type="number" 
              placeholder="Enter your ID"
              {...register("id",{
                required:true,
                maxLength: { value: 10000, message: "Max length is 10000" },
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            { errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p> }
          </div>
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 100, message: "Max length is 100 characters" },
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="1234567890"
              {...register("phonenumber", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" value="male" {...register("gender", { required: "Please select your gender" })} />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" value="female" {...register("gender", { required: "Please select your gender" })} />
                <span>Female</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" value="other" {...register("gender", { required: "Please select your gender" })} />
                <span>Other</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
