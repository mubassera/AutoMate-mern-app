import axios from "axios";

const baseURL = "https://auto-mate-mern-app-glrn.vercel.app";

//sign up user
export const signup = async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios.post(`${baseURL}/user/register/`, data, config);
  return response.data;
};

//login user
export const login = async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios.post(`${baseURL}/user/login/`, data, config);
  return response.data;
};

//logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/user/logout`,
      {},
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Logout failed: " + error.response.data.message);
  }
};

//get token
export const getToken = () => {
  return JSON.parse(localStorage.getItem("userData")).accessToken;
};
