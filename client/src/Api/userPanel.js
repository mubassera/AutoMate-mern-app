import axios from "axios";
import { getToken } from "./auth";

const userURL = "https://auto-mate-mern-app-glrn.vercel.app/user";
const userURL2 = "http://localhost:5000/user";

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
    if (error.response && error.response.status === 401) {
      return { message: "Unauthorized access. Please log in again." };
    } else if (error.response && error.response.status === 403) {
      // Token expired, handle logout or token refresh
      return { message: "Access Token Expired. Please log in again." };
    }

    // General error handler
    return {
      message: "An error occurred while fetching data.",
      error: error.message,
    };
  }
};
