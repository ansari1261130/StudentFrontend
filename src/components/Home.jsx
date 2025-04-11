import React from "react";
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className="bg-blue-900 min-h-screen flex justify-start md:justify-between items-center text-white">
      <h1 className="text-9xl w-10 font-bold m-5">STUDENT'S DATA</h1>
      <div className="bg-blue-100 min-h-screen flex justify-center items-center">
      <div className="flex space-x-4 m-10 ">
        <button className="px-4 py-2 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-200 transition">
          <Link to={'getData'}>GET DATA</Link>
        </button>
        <button className="px-4 py-2 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-200 transition">
          <Link to={'form'}>SET DATA</Link>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Home;
