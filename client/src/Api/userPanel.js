import axios from "axios";
import { getToken, getRefreshToken, setAccessToken, logoutUser } from "./auth";

const userURL = "https://auto-mate-mern-app-glrn.vercel.app/user";
const userURL2 = "http://localhost:5000/user";

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axios.post(`${userURL2}/refresh`, { refreshToken });
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

    const response = await axios.get(`${userURL2}/parts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params,
    });

    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(`${userURL2}/parts`, {
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
