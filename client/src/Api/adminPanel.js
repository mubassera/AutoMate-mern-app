import axios from "axios";
import { getToken } from "./auth";

const adminURL = "https://auto-mate-mern-app-glrn.vercel.app/admin";

export const fetchAllUsers = async () => {
  const token = getToken();
  const response = await axios.get(`${adminURL}/AllUsers`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
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
  const token = getToken();
  const response = await axios.delete(`${adminURL}/AllParts/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: { id },
  });
  return response.data;
};

//Add new part
export const addPart = async (formData) => {
  try {
    const response = await axios.post(`${adminURL}/AllParts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding part:", error);
    throw error;
  }
};

// update a part
export const updatePart = async (partId, formData) => {
  try {
    const response = await axios.put(
      `${adminURL}/AllParts/${partId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        params: { id },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating part:", error);
    throw error;
  }
};

//fetch all parts
export const fetchAllParts = async () => {
  const token = getToken();
  const response = await axios.get(`${adminURL}/AllParts`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
