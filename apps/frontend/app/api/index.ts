import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);
