import axios from "axios";
import { getToken } from "./auth";
import { refreshAccessToken } from "./userPanel";

const adminURL = "https://auto-mate-mern-app-glrn.vercel.app/admin";
//const adminURL = "http://localhost:5000/admin";

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

const adminOrdersUrl = "http://localhost:5000/admin";

// Function to fetch orders with filters and pagination
export const fetchOrders = async (page, limit, paymentStatus, status) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${adminURL}//orders?page=${page}&limit=${limit}&paymentStatus=${paymentStatus}&status=${status}`,
      config
    );
    return response.data; // Return the fetched data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        };

        const response = await axios.get(
          `${adminURL}/orders?page=${page}&limit=${limit}&paymentStatus=${paymentStatus}&status=${status}`,
          config
        );
        return response.data;
      }
    }
    console.error("Error fetching orders:", error);
    throw error; // Rethrow for error handling
  }
};

// Function to update order details
export const updateOrder = async (orderId, paymentStatus, status) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `${adminURL}//update-order`,
      { orderId, paymentStatus, status },
      config
    );
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        };

        await axios.post(
          `${adminURL}//update-order`,
          { orderId, paymentStatus, status },
          config
        );
      }
    }
    console.error("Error updating order:", error);
    throw error; // Rethrow for error handling
  }
};

// Fetch all services
export const fetchAllServices = async () => {
  try {
    const token = getToken();
    const response = await axios.get(
      "https://auto-mate-mern-app-glrn.vercel.app/all-services",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(
          "https://auto-mate-mern-app-glrn.vercel.app/all-services",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      }
    }
    throw error;
  }
};

// Update service cost
export const updateServiceCostApi = async (id, cost) => {
  try {
    const token = getToken();
    await axios.put(
      `${adminURL}/services/${id}`,
      { cost },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        await axios.put(
          `${adminURL}/services/${id}`,
          { cost },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
      }
    }
    throw error;
  }
};

// Add new service
export const addNewServiceApi = async (serviceData) => {
  const token = getToken();
  try {
    await axios.post(`${adminURL}/new-service`, serviceData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        await axios.post(`${adminURL}/new-service`, serviceData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
      }
    }
    throw error;
  }
};

// Fetch service requests with search and pagination
export const fetchServiceRequestsApi = async (params) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${adminURL}/service-requests`,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(
          `${adminURL}/service-requests`,
          { params },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      }
    }

    throw error;
  }
};

//update service requests
export const updateServiceRequestStatusApi = async (
  id,
  status,
  paymentStatus
) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${adminURL}/update-service-status/${id}`,
      {
        status,
        paymentStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.put(
          `${adminURL}/update-service-status/${id}`,
          {
            status,
            paymentStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      }
    }

    throw error;
  }
};
