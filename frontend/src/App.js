import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, [updateUI]);

  const addUser = () => {
    const newUser = `${firstName} ${lastName} ${phoneNumber} ${username} ${password}`;

    axios.post(`${baseURL}/save`, { user: newUser }).then((res) => {
      console.log(res.data);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setUsername("");
      setPassword("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateUser = () => {
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
    };

    axios
      .put(`${baseURL}/update/${updateId}`, { user: updatedUser })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setUsername("");
        setPassword("");
      });
  };

  const deleteUser = (id) => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <main>
      <h1 className="title">User Management</h1>

      <div className="input_holder">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={updateId ? updateUser : addUser}>
          {updateId ? "Update User" : "Add User"}
        </button>
      </div>

      <ul>
        {users.map((user) => (
          <List
            key={user._id}
            id={user._id}
            user={user.user}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
            deleteUser={deleteUser}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
