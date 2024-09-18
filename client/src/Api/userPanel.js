import axios from "axios";
import { getToken, getRefreshToken, setAccessToken, logoutUser } from "./auth";

//const userURL = "https://auto-mate-mern-app-glrn.vercel.app/user";
const userURL = "http://localhost:5000/user";

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  const _id = JSON.parse(localStorage.getItem("userData"))._id;

  try {
    const response = await axios.post(`${userURL}/refresh`, {
      refreshToken,
      _id,
    });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    await logoutUser(); // If refresh fails, log out the user
  }
};

export const fetchAllPartsForUser = async (params) => {
  try {
    const token = getToken();

    const response = await axios.get(`${userURL}/parts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params,
    });

    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(`${userURL}/parts`, {
          headers: {
            Authorization: "Bearer " + newToken,
          },
          params,
        });
        return response.data;
      }
    }

    console.error("Error fetching parts:", error);
    throw error;
  }
};

export const fetchProfileData = async () => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem("userData")
    ).accessToken;
    console.log("Fetching user profile with token:", accessToken); // Log the token

    const response = await axios.get(`${userURL}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const accessToken = JSON.parse(
          localStorage.getItem("userData")
        ).accessToken;
        const response = await axios.get(`${userURL}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      }
    }
    console.error("Error fetching profile:", error);
  }
};
