import './App.css';
import Dashboard from './components/dashboard/dashboard';
import api from "./api/axiosInstance.js"
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"



function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthorized = async() => {
      const response = await api.get("/users/isAuthorized");

      if(response && response.data.status == 400){
        navigate("/login");
      }
    }
    isAuthorized();
  }, [])

  return (
    <div className="App text-center w-full">
      <Dashboard/>
    </div>
  );
}

export default App;
