import React from 'react';
import { useParams } from 'react-router-dom';
import { useStudentData } from '../Hook/useStudentData';

const StudentDetails = () => {
  const { id } = useParams();  // Get the student ID from URL params
  const { data: studentData = [] } = useStudentData();  // Ensure studentData is always an array

  // Find the student by ID
  const student = studentData?.find((s) => s.id?.toString() === id);

  // If student not found, show error message
  if (!student) {
    return <p className="text-red-600 text-center mt-6">Student not found</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-gray-800">{student.id}. {student.name}</h1>
        <p className="text-gray-600 mt-2">📞 {student.phone_number}</p>
        <p className="text-gray-600">📧 {student.email}</p>
        <p className="text-gray-600">🧑 {student.gender}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
