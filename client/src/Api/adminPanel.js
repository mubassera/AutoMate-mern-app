import axios from "axios";
import { getToken } from "./auth";
import { refreshAccessToken } from "./userPanel";

//const adminURL = "https://auto-mate-mern-app-glrn.vercel.app/admin";
const adminURL = "http://localhost:5000/admin";

export const fetchAllUsers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${adminURL}/AllUsers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    {
      // Handle unauthorized access or expired token
      if (error.response && error.response.status === 403) {
        const newToken = await refreshAccessToken(); // Refresh token and retry request
        if (newToken) {
          const response = await axios.get(`${adminURL}/AllUsers`, {
            headers: {
              Authorization: "Bearer " + newToken,
            },
          });
          return response.data;
        }
      }

      console.error("Error fetching users:", error);
      throw error;
    }
  }
};

export const updateUser = async (id, editValues) => {
  const token = getToken();
  const response = await axios.put(`${adminURL}/AllUsers/${id}`, editValues, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: { id },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${adminURL}/AllUsers/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: { id },
  });
  return response.data;
};

export const addUser = async (newUser) => {
  const token = getToken();
  const response = await axios.post(`${adminURL}/AllUsers`, newUser, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

//delete part
export const deletePart = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${adminURL}/AllParts/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.delete(`${adminURL}/AllParts/${id}`, {
          headers: {
            Authorization: "Bearer " + newToken,
          },
          params: { id },
        });
        return response.data;
      }
    }
    console.error("Error deleting part:", error);
    throw error;
  }
};

//Add new part
export const addPart = async (formData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${adminURL}/AllParts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.post(`${adminURL}/AllParts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + newToken,
          },
        });
        return response.data;
      }
    }
    console.error("Error adding part:", error);
    throw error;
  }
};

// update a part
export const updatePart = async (partId, formData) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${adminURL}/AllParts/${partId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        params: { partId },
      }
    );
    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.put(
          `${adminURL}/AllParts/${partId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + newToken,
            },
            params: { partId },
          }
        );
        return response.data;
      }
    }

    console.error("Error updating part:", error);
    throw error;
  }
};

//fetch all parts
export const fetchAllParts = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${adminURL}/AllParts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(`${adminURL}/AllParts`, {
          headers: {
            Authorization: "Bearer " + newToken,
          },
        });
        return response.data;
      }
    }

    console.error("Error fetching parts for admin:", error);
    throw error;
  }
};
