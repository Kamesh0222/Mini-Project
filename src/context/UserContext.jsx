import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedCurrentUser = localStorage.getItem("currentUser");
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  const [qrData, setQrData] = useState(() => {
    return currentUser ? currentUser.qrData || [] : [];
  });

  useEffect(() => {
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setQrData(currentUser.qrData || []);
    }
  }, [currentUser]);

  const addQr = (newQr) => {
    const updatedQrData = [...qrData, newQr];
    setQrData(updatedQrData);
    updateUserQrData(updatedQrData);
  };

  const deleteQr = (id) => {
    const updatedQrData = qrData.filter((qr) => qr.id !== id);
    setQrData(updatedQrData);
    updateUserQrData(updatedQrData);
  };

  const updateQr = (id, updatedQr) => {
    const updatedQrData = qrData.map((qr) => (qr.id === id ? updatedQr : qr));
    setQrData(updatedQrData);
    updateUserQrData(updatedQrData);
  };

  const updateUserQrData = (updatedQrData) => {
    const updatedUser = { ...currentUser, qrData: updatedQrData };
    setCurrentUser(updatedUser);
    const updatedUsers = users.map((user) =>
      user.userName === currentUser.userName ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const signupUser = (newUser) => {
    // Check if username already exists
    const userExists = users.some((user) => user.userName === newUser.userName);
    if (!userExists) {
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
    } else {
      alert("Username already exists.");
    }
  };

  const loginUser = (loginDetails) => {
    const user = users.find(
      (user) =>
        user.userName === loginDetails.userName &&
        user.password === loginDetails.password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    } else {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        setCurrentUser,
        qrData,
        addQr,
        deleteQr,
        updateQr,
        signupUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
