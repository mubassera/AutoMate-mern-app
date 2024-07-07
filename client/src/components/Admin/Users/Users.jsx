import React, { useState, useEffect } from "react";
import "./Users.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import axios from "axios";

export const Users = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editingNewUserId, setEditingNewUserId] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserVehicle, setNewUserVehicle] = useState("");
  const [newUserBrand, setNewUserBrand] = useState("");
  const [newUserModel, setNewUserModel] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userData")).accessToken;
      const response = await axios.get("http://localhost:5000/admin/AllUsers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleEdit = (id) => {
    setEditUserId(id);
  };

  const handleSave = async (
    id,
    name,
    email,
    vehicleType,
    vehicleBrand,
    vehicleModel
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("userData")).accessToken;
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            name: name,
            email: email,
            vehicleType: vehicleType,
            vehicleBrand: vehicleBrand,
            vehicleModel: vehicleModel,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditUserId(null);

      await axios.put(
        `http://localhost:5000/admin/AllUsers/${id}`,
        {
          name: name,
          email: email,
          vehicleType: vehicleType,
          vehicleBrand: vehicleBrand,
          vehicleModel: vehicleModel,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: { id },
        }
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("userData")).accessToken;
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);

      await axios.delete(`http://localhost:5000/admin/AllUsers/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { id },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = () => {
    const newUser = {
      name: "New User",
      email: "newuser@gmail.com",
      vehicleType: "Vehicle",
      vehicleBrand: "Brand",
      vehicleModel: "Model",
    };
    setEditingNewUserId(newUser.id);
  };

  const handleSaveNewUser = async (
    newName,
    newEmail,
    newVehicle,
    newBrand,
    newModel
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("userData")).accessToken;
      const newUser = {
        name: newName,
        email: newEmail,
        vehicleType: newVehicle,
        vehicleBrand: newBrand,
        vehicleModel: newModel,
      };
      setUsers([...users, newUser]);
      setEditingNewUserId(null);

      await axios.post(`http://localhost:5000/admin/AllUsers`, newUser, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    switch (selectedFilter) {
      case "name":
        return user.name.toLowerCase().includes(searchLower);
      case "email":
        return user.email.toLowerCase().includes(searchLower);
      case "vehicle":
        return user.vehicle.toLowerCase().includes(searchLower);
      case "brand":
        return user.brand.toLowerCase().includes(searchLower);
      case "model":
        return user.model.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <div className="users">
      <AdminSidebar />
      <div className="usersContents">
        <h1>All Users</h1>
        <div className="UserSearch">
          <div className="searchWrapper">
            <span className="icon">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder={`Search by ${selectedFilter}`}
              className="searchInput"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filterSelectButton">
            <select
              className="filterSelect"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="vehicle">Vehicle</option>
              <option value="brand">Brand</option>
              <option value="model">Model</option>
            </select>
          </div>
        </div>
        <div className="usersTable">
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Vehicle</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>

                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                          handleSave(
                            user.id,
                            e.target.value,
                            user.email,
                            user.vehicleType,
                            user.vehicleBrand,
                            user.vehicleModel
                          )
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <input
                        type="text"
                        value={user.email}
                        onChange={(e) =>
                          handleSave(
                            user.id,
                            user.name,
                            e.target.value,
                            user.vehicleType,
                            user.vehicleBrand,
                            user.vehicleModel
                          )
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <input
                        type="text"
                        value={user.vehicle}
                        onChange={(e) =>
                          handleSave(
                            user.id,
                            user.name,
                            user.email,
                            e.target.value,
                            user.vehicleBrand,
                            user.vehicleModel
                          )
                        }
                      />
                    ) : (
                      user.vehicleType
                    )}
                  </td>
                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <input
                        type="text"
                        value={user.brand}
                        onChange={(e) =>
                          handleSave(
                            user.id,
                            user.name,
                            user.email,
                            user.vehicleType,
                            e.target.value,
                            user.vehicleModel
                          )
                        }
                      />
                    ) : (
                      user.vehicleBrand
                    )}
                  </td>
                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <input
                        type="text"
                        value={user.model}
                        onChange={(e) =>
                          handleSave(
                            user.id,
                            user.name,
                            user.email,
                            user.vehicleType,
                            user.vehicleBrand,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      user.vehicleModel
                    )}
                  </td>

                  <td>
                    {editingNewUserId === user.id || editUserId === user.id ? (
                      <div className="button">
                        <button
                          onClick={() =>
                            handleSave(
                              user.id,
                              user.name,
                              user.email,
                              user.vehicleType,
                              user.vehicleBrand,
                              user.vehicleModel
                            )
                          }
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <div className="button">
                        <button onClick={() => handleEdit(user.id)}>
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="button">
                      <button onClick={() => handleDelete(user.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {editingNewUserId && (
                <tr>
                  <td>{users.length + 1}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Vehicle"
                      onChange={(e) => setNewUserVehicle(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Brand"
                      onChange={(e) => setNewUserBrand(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Model"
                      onChange={(e) => setNewUserModel(e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleSaveNewUser(
                          newUserName,
                          newUserEmail,
                          newUserVehicle,
                          newUserBrand,
                          newUserModel
                        )
                      }
                    >
                      <FaSave />
                    </button>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="addUserButton">
          <button onClick={handleAddUser}>+ Add User</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
