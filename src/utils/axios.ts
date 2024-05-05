import axios from "axios";


export const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
  });
  
  // Alter defaults after instance has been created
  Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`