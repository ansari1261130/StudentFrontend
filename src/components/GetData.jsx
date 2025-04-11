import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStudentData } from "../Hook/useStudentData";
import { Link } from "react-router-dom";

const GetData = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { data: studentData = [], loading, error } = useStudentData();
  const [filteredData, setFilteredData] = useState([]);

  // Update filteredData when studentData is fetched
  useEffect(() => {
    setFilteredData(studentData);
  }, [studentData]);

  function onSubmit(data) {
    const searchTerm = data.search?.trim().toLowerCase();
    
    if (!searchTerm) {
      setFilteredData(studentData); // Reset to all students if input is empty
      return;
    }

    const filteredStudents = studentData.filter(student =>
      student.name.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredStudents);
  }

  return (
    <div className="bg-blue-900 min-h-screen flex justify-center items-start text-white">
      <div className="bg-blue-100 h-auto py-10 px-6 rounded-lg shadow-lg my-10 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Search Student</h2>

        {/* Search Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 text-center">
          <input
            type="text"
            placeholder="Enter name..."
            {...register("search")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Display Loading/Error State */}
        {loading && <p className="text-gray-700 mt-4">Loading student data...</p>}
        {error && <p className="text-red-600 mt-4">Error: {error.message}</p>}

        {/* Display Student Data in Grid */}
        <div className="mt-4">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {filteredData.map((student) => (
                <div key={student.id} className="bg-blue-100 p-4 rounded-lg shadow-lg">
                  <Link to={`/studentData/${student.id}`} className="text-blue-900 font-bold hover:underline">
                    {student.name}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-gray-700 mt-4">No student found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetData;
