import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role")?.toLowerCase();
    // console.log(role)
  if (!role) return;
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/${role}/me`);
        // console.log(res.data.data)
        setUserData(res.data.data);
      } catch (error) {
        console.error("User fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  return {
    userData: userData || {},
    loading,
  }
};
