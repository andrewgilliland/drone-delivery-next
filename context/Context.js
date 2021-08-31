import { createContext, useState } from "react";

export const DroneDeliveryContext = createContext();

export const Provider = ({ children }) => {
  const [userData, setUser] = useState({});

  const handleChangeUser = (value) => {
    setUser(value);
  };

  const value = {
    userData,
    handleChangeUser,
  };

  return (
    <DroneDeliveryContext.Provider value={value}>
      {children}
    </DroneDeliveryContext.Provider>
  );
};
