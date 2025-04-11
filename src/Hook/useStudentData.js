import { useEffect, useState } from "react";
import axios from "axios";

export function useStudentData() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://studentdatabackend-c1dr.onrender.com/api/students/`);
        setData(res.data);
      } catch (err) { 
        console.error("Error fetching student data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error };
}
