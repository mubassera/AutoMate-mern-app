import React, { useState } from 'react';
import './Users.css';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { FaSearch, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

export const Users = () => {
  const [search, setsearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('name');


  const [users, setUsers] = useState([
    { id: 1, name: 'mahdi', email: 'mahdi@gmail.com', vehicle: 'Car', brand: 'lalal', model: 'bebebe' },
    { id: 2, name: 'Meaw', email: 'meaw@gmail.com', vehicle: 'Bike', brand: 'lalal', model: 'bebebe' },
    { id: 3, name: 'Mr.Bean', email: 'mr.bean@gmail.com', vehicle: 'Car', brand: 'xyz', model: 'abc' }
  ]);

  const [editUserId, setEditUserId] = useState(null);
  const [editingNewUserId, setEditingNewUserId] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserVehicle, setNewUserVehicle] = useState('');
  const [newUserBrand, setNewUserBrand] = useState('');
  const [newUserModel, setNewUserModel] = useState('');



  const filteredUsers = users.filter(user => {
    const searchLower = search.toLowerCase();
    switch (selectedFilter) {
      case 'name':
        return user.name.toLowerCase().includes(searchLower);
      case 'email':
        return user.email.toLowerCase().includes(searchLower);
      case 'vehicle':
        return user.vehicle.toLowerCase().includes(searchLower);
      case 'brand':
        return user.brand.toLowerCase().includes(searchLower);
      case 'model':
        return user.model.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });



  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };


  const handleEdit = (id) => {
    setEditUserId(id);
  };


  const handleSave = (id, newName, newEmail, newVehicle, newBrand, newModel) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          name: newName,
          email: newEmail,
          vehicle: newVehicle,
          brand: newBrand,
          model: newModel
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditUserId(null); 
  };


  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  
  const handleAddUser = () => {
    const newUser = { id: users.length + 1, name: 'New User', email: 'newuser@gmail.com', vehicle: 'Vehicle', brand: 'Brand', model: 'Model' };
    setEditingNewUserId(newUser.id);
  };


  const handleSaveNewUser = (newName, newEmail, newVehicle, newBrand, newModel) => {
    const newUser = {
      id: users.length + 1,
      name: newName,
      email: newEmail,
      vehicle: newVehicle,
      brand: newBrand,
      model: newModel
    };
    setUsers([...users, newUser]);
    setEditingNewUserId(null);
  };


  return (
    <div className='users'>
      <AdminSidebar />
      <div className='usersContents'>
        <h1>All Users</h1>
        <div className='UserSearch'>
          <div className='searchWrapper'>
            <span className='icon'>
              <FaSearch />
            </span>
            <input
              type='text'
              placeholder={`Search by ${selectedFilter}`}
              className='searchInput'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
          <div className='filterSelectButton'>
            <select className='filterSelect' value={selectedFilter} onChange={handleFilterChange}>
              <option value='name'>Name</option>
              <option value='email'>Email</option>
              <option value='vehicle'>Vehicle</option>
              <option value='brand'>Brand</option>
              <option value='model'>Model</option>
            </select>
          </div>
        </div>
        <div className='usersTable'>
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

                  <td>{(editingNewUserId === user.id || editUserId === user.id) ? (
                    <input type="text" value={user.name} onChange={(e) => handleSave(user.id, e.target.value, user.email, user.vehicle, user.brand, user.model)} />
                  ) : user.name}</td>
                  <td>{(editingNewUserId === user.id || editUserId === user.id) ? (
                    <input type="text" value={user.email} onChange={(e) => handleSave(user.id, user.name, e.target.value, user.vehicle, user.brand, user.model)} />
                  ) : user.email}</td>
                  <td>{(editingNewUserId === user.id || editUserId === user.id) ? (
                    <input type="text" value={user.vehicle} onChange={(e) => handleSave(user.id, user.name, user.email, e.target.value, user.brand, user.model)} />
                  ) : user.vehicle}</td>
                  <td>{(editingNewUserId === user.id || editUserId === user.id) ? (
                    <input type="text" value={user.brand} onChange={(e) => handleSave(user.id, user.name, user.email, user.vehicle, e.target.value, user.model)} />
                  ) : user.brand}</td>
                  <td>{(editingNewUserId === user.id || editUserId === user.id) ? (
                    <input type="text" value={user.model} onChange={(e) => handleSave(user.id, user.name, user.email, user.vehicle, user.brand, e.target.value)} />
                  ) : user.model}</td>


                  <td>
                    {(editingNewUserId === user.id || editUserId === user.id) ? (
                      <div className='button'>
                        <button onClick={() => handleSave(user.id, user.name, user.email, user.vehicle, user.brand, user.model)}><FaSave /></button>
                      </div>
                    ) : (
                      <div className='button'>
                        <button onClick={() => handleEdit(user.id)}><FaEdit /></button>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className='button'>
                      <button onClick={() => handleDelete(user.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {editingNewUserId && (
                <tr>
                  <td>{users.length + 1}</td>
                  <td>
                    <input type="text" placeholder="Name" onChange={(e) => setNewUserName(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" placeholder="Email" onChange={(e) => setNewUserEmail(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" placeholder="Vehicle" onChange={(e) => setNewUserVehicle(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" placeholder="Brand" onChange={(e) => setNewUserBrand(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" placeholder="Model" onChange={(e) => setNewUserModel(e.target.value)} />
                  </td>
                  <td>
                    <button onClick={() => handleSaveNewUser(newUserName, newUserEmail, newUserVehicle, newUserBrand, newUserModel)}><FaSave /></button>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='addUserButton'>
          <button onClick={handleAddUser}>+ Add User</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
