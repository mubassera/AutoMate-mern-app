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
    localStorage.removeItem("userData");
    const response = await axios.post(
      `${baseURL}/user/logout`,
      {},
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    alert("Logout successful");
    window.location.href = "/";
    return response.data;
  } catch (error) {
    throw new Error("Logout failed: " + error.response.data.message);
  }
};

//get token
export const getToken = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData.accessToken;
};
