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
