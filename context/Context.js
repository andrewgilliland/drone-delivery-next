import { createContext, useState } from "react";

export const DroneDeliveryContext = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleChangeUser = (value) => {
    setUser(value);
  };

  const value = {
    user,
    handleChangeUser,
  };

  return (
    <DroneDeliveryContext.Provider value={value}>
      {children}
    </DroneDeliveryContext.Provider>
  );
};
