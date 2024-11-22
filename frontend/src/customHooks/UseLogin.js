import React, { useState } from 'react';
import api from "../api/axiosInstance.js";

function UseLogin() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);

  const loginUser = async (data) => {
    setLoading(true);
    setResponseError(null);
    try {
      const response = await api.post("/users/login", data);
      if (response && response.data) {
        setResponseData(response.data);
        console.log(response.data);
      }
    } catch (error) {
        setResponseError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, responseData, loading, responseError };
}

export default UseLogin;
