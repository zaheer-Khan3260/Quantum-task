import React, { useState } from 'react';
import api from "../api/axiosInstance.js";

function UseRegistration() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);

  const registerUser = async (data) => {
    setLoading(true);
    setResponseError(null);
    try {
      const response = await api.post("/users/register", data);
      if (response && response.data) {
        setResponseData(response.data);
      }
    } catch (error) {
    setResponseError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, responseData, loading, responseError };
}

export default UseRegistration;
